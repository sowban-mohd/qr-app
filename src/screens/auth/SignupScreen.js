import { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { supabase as Supabase } from '../../services/Supabase';
import styles from '../../styles/AuthStyles';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState(''); // Stores email input
  const [password, setPassword] = useState(''); // Stores password input
  const [loading, setLoading] = useState(false); // Loader for signup button

  // Handles signup logic
  const handleSignup = async () => {
    // Validate inputs
    if (!email && !password) {
      Alert.alert('Signup Error', 'Please enter both email and password.');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Signup Error', 'Email cannot be empty.');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Login Error', 'Password cannot be empty.');
      return;
    }

    // Attempt signup
    setLoading(true);
    const { error } = await Supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) {
      Alert.alert('Signup Error', error.message);
    } else {
      Alert.alert('Signup Successful', 'Check your email to confirm your account.');
      navigation.replace('Login'); // Redirect to login after successful signup
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>

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

        {/* Signup button */}
        <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Signing up...' : 'Sign Up'}</Text>
        </TouchableOpacity>

        {/* Link to login */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
          <Text style={styles.text}>Already have an account? </Text>
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate('Login')}
          >
            Login
          </Text>
        </View>
      </View>
    </View>
  );
}
