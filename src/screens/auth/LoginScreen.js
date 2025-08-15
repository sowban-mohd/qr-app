import { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { supabase as Supabase } from '../../services/Supabase';
import styles from '../../styles/AuthStyles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState(''); // Stores email input
  const [password, setPassword] = useState(''); // Stores password input
  const [loading, setLoading] = useState(false); // Loading state for login button

  // Handles login logic
  const handleLogin = async () => {
    // Validate inputs
    if (!email && !password) {
      Alert.alert('Login Error', 'Please enter both email and password.');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Login Error', 'Email cannot be empty.');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Login Error', 'Password cannot be empty.');
      return;
    }

    // Attempt login
    setLoading(true);
    const { error } = await Supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      Alert.alert('Login Error', error.message);
    } else {
      navigation.replace('Home'); // Navigate to home if login is successful
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back!</Text>

        {/* Email input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        {/* Password input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          secureTextEntry
        />

        {/* Login button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
        </TouchableOpacity>

        {/* Signup link */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
          <Text style={styles.text}>Don't have an account? </Text>
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate('Signup')}
          >
            Sign up
          </Text>
        </View>
      </View>
    </View>
  );
}
