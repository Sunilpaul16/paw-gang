import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

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
  handleSignUp: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  form,
  setForm,
  handleSignUp
}) => (
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
        onChangeText={email => setForm({ ...form, email })}
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
        onChangeText={password => setForm({ ...form, password })}
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
        onChangeText={confirmPassword => setForm({ ...form, confirmPassword })}
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

export default SignUpForm;
