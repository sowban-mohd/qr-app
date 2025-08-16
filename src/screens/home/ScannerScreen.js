import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Tooltip } from 'react-native-paper';
import { supabase as Supabase } from '../../services/Supabase';
import { useState } from 'react';

export default function ScannerScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions(); // Camera permission state & function to request
  const [loading, setLoading] = useState(false); // Loader for logout process

  // Handles QR scan button press
  const handleScanPress = async () => {
    // If permission not yet granted, request it
    if (!permission?.granted) {
      const newPermission = await requestPermission();
      if (!newPermission.granted) {
        Alert.alert("Permission needed", "We need camera access to scan QR codes.");
        return; // Stop if still not granted
      }
    }
    // Permission granted → Go to Camera screen
    navigation.navigate("Camera");
  };

  // Handles user logout
  const handleLogout = async () => {
    setLoading(true);
    const { error } = await Supabase.auth.signOut();
    setLoading(false);

    if (error) {
      Alert.alert('Error logging out:', error.message);
    }
    // } else {
    //   navigation.replace('Login'); // Go back to login screen after logout
    // }
  };

  return (
    <View style={styles.container}>
      {/* Logout button (top right) */}
      <View style={styles.logutButton}>
        {loading ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <Tooltip title={'Logout'}>
            <TouchableOpacity onPress={handleLogout}>
              <Ionicons name={"log-out-outline"} size={26} color="#000" />
            </TouchableOpacity>
          </Tooltip>
        )}
      </View>

      {/* Centered scan QR button */}
      <View style={styles.centerContent}>
        <TouchableOpacity style={styles.scanButton} onPress={handleScanPress}>
          <Text style={styles.scanText}>Scan QR Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  logutButton: { position: 'absolute', top: 20, right: 20 },
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scanButton: {
    backgroundColor: '#4e9cff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    elevation: 3,
  },
  scanText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
