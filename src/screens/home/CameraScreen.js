import { SafeAreaView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { CameraView } from 'expo-camera';

export default function CameraScreen({ navigation }) {
  // Called when a QRcode is scanned
  const handleBarCodeScanned = ({ data }) => {
    // Navigate to Result screen with scanned data
    navigation.replace('Result', { scannedText: data });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Camera view for scanning QR codes */}
      <CameraView
        style={StyleSheet.absoluteFillObject} // Fills entire screen
        onBarcodeScanned={handleBarCodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }} // Scan only QR codes
      />

      {/* Back button */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.closeText}>Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#ff4e4e',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  closeText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
