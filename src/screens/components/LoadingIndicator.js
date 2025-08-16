import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function LoadingIndicator() {
    return (
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
            <ActivityIndicator size="large" color="#4e9cff" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f4f7', padding: 15 },
});