import { Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase as Supabase } from '../../services/Supabase';
import { useEffect, useState } from 'react';
import { setStringAsync } from 'expo-clipboard';

export default function ResultScreen({ route, navigation }) {
    const { scannedText } = route.params; // Text scanned from QR passed via navigation
    const [loading, setLoading] = useState(true); // To track loading state when saving scan

    // Runs once when screen loads to save scan in Supabase
    useEffect(() => {
        saveScan();
    }, []);

    // Saves scanned text to Supabase with current user's ID
    const saveScan = async () => {
        const { data: { user } } = await Supabase.auth.getUser(); // Get logged-in user
        try {
            const { error } = await Supabase.from('scans')
                .insert([{ text: scannedText, user_id: user.id }]);
            if (error) throw error;
        } catch (err) {
            Alert.alert('Error saving scan:', err.message);
        } finally {
            setLoading(false); // Stop loader after save attempt
        }
    };

    // Copies scanned text to clipboard
    const copyToClipboard = async () => {
        await setStringAsync(scannedText);
        Alert.alert("Copied!", "Result has been copied to clipboard.");
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Back button */}
            <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#4e9cff" />
            </TouchableOpacity>

            {loading ? (
                // Show loading spinner while saving
                <ActivityIndicator size="large" color="#4e9cff" />
            ) : (
                <>
                    {/* Display scanned text */}
                    <Text style={styles.scannedText}>{scannedText}</Text>

                    {/* Copy to clipboard button */}
                    <TouchableOpacity style={styles.button} onPress={copyToClipboard}>
                        <Text style={styles.buttonText}>Copy Result</Text>
                    </TouchableOpacity>

                    {/* Scan another QR button */}
                    <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Camera')}>
                        <Text style={styles.buttonText}>Scan Another QR</Text>
                    </TouchableOpacity>
                </>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f7', paddingHorizontal: 20 },
    backArrow: { position: 'absolute', top: 15, left: 15, padding: 5 },
    scannedText: { fontSize: 18, marginBottom: 30, textAlign: 'center' },
    button: {
        backgroundColor: '#4e9cff',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 12,
        elevation: 3,
        marginTop: 15,
    },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
