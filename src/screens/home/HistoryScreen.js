import { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { supabase } from '../../services/Supabase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoadingIndicator from '../components/LoadingIndicator';
import { setStringAsync } from 'expo-clipboard';
import { useFocusEffect } from '@react-navigation/native';

export default function HistoryScreen() {
  const [scans, setScans] = useState([]);
  const [filteredScans, setFilteredScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  // Fetch scans from Supabase
  const fetchScans = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('scans')
      .select('id, text, scanned_at')
      .order('scanned_at', { ascending: false });

    if (error) {
      Alert.alert('Error fetching scans', error.message);
    } else {
      setScans(data);
      setFilteredScans(
        searchText
          ? data.filter(scan => scan.text.toLowerCase().includes(searchText.toLowerCase()))
          : data
      );
    }
    setLoading(false);
  };

  // Run fetchScans every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchScans();
    }, [])
  );

  // Update filtered scans when search text changes
  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredScans(scans);
    } else {
      const filtered = scans.filter(scan =>
        scan.text.toLowerCase().includes(searchText.trim().toLowerCase())
      );
      setFilteredScans(filtered);
    }
  }, [searchText, scans]);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Scan History</Text>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search by text..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {scans.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your scan history is empty.</Text>
        </View>
      ) : filteredScans.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No results found for "{searchText}".</Text>
        </View>
      ) : (
        <FlatList
          data={filteredScans}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable
              onLongPress={async () => {
                await setStringAsync(item.text);
                Alert.alert('Copied!', 'Text has been copied to clipboard.');
              }}
            >
              <View style={styles.item}>
                <Text style={styles.title}>{item.text}</Text>
                <Text style={styles.date}>
                  {new Date(item.scanned_at).toLocaleString()}
                </Text>
              </View>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f7', padding: 15 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchBar: { flex: 1, fontSize: 16, paddingVertical: 8 },
  item: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: '500', color: '#333' },
  date: { fontSize: 14, color: '#888', marginTop: 5 },
  emptyContainer: { alignItems: 'center', marginTop: 50 },
  emptyText: { fontSize: 16, color: '#888' },
});
