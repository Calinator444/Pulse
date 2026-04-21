import { supabase } from '@/utils/supabase';
import React, { useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const signInWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) Alert.alert('Error', error.message);
    setLoading(false);
  };

  const signUpWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Check your email for a confirmation link.');
    }
    setLoading(false);
  };

  return (
    <View className="flex-1 bg-background justify-center px-8 gap-4">
      <Text className="font-lexend-extraBold text-3xl uppercase text-white text-center mb-4">
        Pulse
      </Text>
      <Text className="font-lexend-extraLight text-muted-alt text-center text-sm mb-4">
        {isSignUp ? 'Create an account to get started' : 'Sign in to continue'}
      </Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="#666"
        autoCapitalize="none"
        keyboardType="email-address"
        className="bg-white/10 rounded-lg px-4 py-3 text-white font-lexend-extraLight"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="#666"
        secureTextEntry
        className="bg-white/10 rounded-lg px-4 py-3 text-white font-lexend-extraLight"
      />

      <Pressable
        onPress={isSignUp ? signUpWithEmail : signInWithEmail}
        disabled={loading}
        className="bg-white rounded-lg py-3 mt-2">
        <Text className="text-black font-lexend-extraBold text-sm text-center">
          {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
        </Text>
      </Pressable>

      <Pressable onPress={() => setIsSignUp(!isSignUp)}>
        <Text className="text-white/60 font-lexend-extraLight text-sm text-center mt-2">
          {isSignUp
            ? 'Already have an account? Sign In'
            : "Don't have an account? Sign Up"}
        </Text>
      </Pressable>
    </View>
  );
}
