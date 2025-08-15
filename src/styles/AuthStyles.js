import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f7', padding: 20 },
    card: { width: '100%', backgroundColor: 'white', borderRadius: 15, padding: 30, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10, elevation: 5 },
    title: { fontSize: 28, fontWeight: '600', marginBottom: 25, textAlign: 'center', color: '#333' },
    input: { borderWidth: 1, borderColor: '#ddd', padding: 12, marginBottom: 15, borderRadius: 10, backgroundColor: '#f9f9f9', fontSize: 16 },
    button: { backgroundColor: '#4e9cff', paddingVertical: 14, borderRadius: 10, alignItems: 'center', shadowColor: '#4e9cff', shadowOpacity: 0.3, shadowOffset: { width: 0, height: 3 }, shadowRadius: 5, elevation: 3 },
    buttonText: { color: 'white', fontSize: 18, fontWeight: '500' },
    text : { color: '#000', textAlign: 'center', fontSize: 14 },
    linkText: { color: '#4e9cff', textAlign: 'center', fontSize: 14 },
});
