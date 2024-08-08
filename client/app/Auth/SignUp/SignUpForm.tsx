import React from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../Types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SignUpFormProps {
  form: {
    email: string;
    password: string;
    confirmPassword: string;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
      confirmPassword: string;
    }>
  >;
  navigation: StackNavigationProp<RootStackParams, "SignUp">;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  form,
  setForm,
  navigation,
}) => {
  const handleSignUp = async () => {
    const { email, password, confirmPassword } = form;

    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      const response1 = await fetch("http://10.10.22.20:3000/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response1.ok) {
        const errorData = await response1.json();
        Alert.alert("Error", errorData.error || "Sign-up failed.");
        return;
      }

      const users = await response1.json();

      const userExists = users.some(
        (user: { userId: string }) => user.userId === email
      );

      if (userExists) {
        Alert.alert("Error", "User already exists");
      } else {
        const response2 = await fetch("http://10.10.22.20:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: email, password }),
        });

        if (!response2.ok) {
          const errorData = await response2.json();
          Alert.alert("Error", errorData.error || "Sign-up failed.");
          return;
        }

        const response = await fetch("http://10.10.22.20:3000/sessions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: email, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          Alert.alert("Error", errorData.error || "Login failed.");
          return;
        }

        const responseData = await response.json();
        const token = responseData.token;

        const verifyResponse = await fetch(
          `http://10.10.22.20:3000/sessions/${token}`
        );

        if (!verifyResponse.ok) {
          Alert.alert("Error", "Failed to verify token.");
          return;
        }
        const verifyResponseData = await verifyResponse.json();

        const userId = verifyResponseData.userId;

        await AsyncStorage.setItem("userToken", token);
        await AsyncStorage.setItem("userId", userId);

        Alert.alert("Success", "User registered successfully.");
        navigation.navigate("Main");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
      console.error("Error signing up:", error);
    }
  };

  return (
    <View className="mb-6 px-6 flex-1">
      <View className="mb-4">
        <Text className="text-lg font-semibold text-black mb-2">
          Email address
        </Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          keyboardType="email-address"
          onChangeText={(email) => setForm((prev) => ({ ...prev, email }))}
          placeholder="hachiko@example.com"
          placeholderTextColor="grey"
          className="h-[50px] bg-[#cfcec9] px-4 rounded-xl text-base font-medium text-black border border-black"
          value={form.email}
        />
      </View>
      <View className="mb-4">
        <Text className="text-lg font-semibold text-black mb-2">Password</Text>
        <TextInput
          autoCorrect={false}
          clearButtonMode="while-editing"
          onChangeText={(password) =>
            setForm((prev) => ({ ...prev, password }))
          }
          placeholder="********"
          placeholderTextColor="grey"
          className="h-[50px] bg-[#cfcec9] px-4 rounded-xl text-base font-medium text-black border border-black"
          secureTextEntry={true}
          value={form.password}
        />
      </View>
      <View className="mb-4">
        <Text className="text-lg font-semibold text-black mb-2">
          Confirm Password
        </Text>
        <TextInput
          autoCorrect={false}
          clearButtonMode="while-editing"
          onChangeText={(confirmPassword) =>
            setForm((prev) => ({ ...prev, confirmPassword }))
          }
          placeholder="********"
          placeholderTextColor="grey"
          className="h-[50px] bg-[#cfcec9] px-4 rounded-xl text-base font-medium text-black border border-black"
          secureTextEntry={true}
          value={form.confirmPassword}
        />
      </View>
      <View className="mt-1 mb-4">
        <TouchableOpacity onPress={handleSignUp}>
          <View className="flex-row items-center justify-center rounded-3xl py-2.5 px-5 border border-[#008CBA] bg-[#008CBA]">
            <Text className="text-lg leading-7 font-semibold text-white">
              Sign up
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpForm;
