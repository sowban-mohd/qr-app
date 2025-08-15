import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import { supabase } from '../../services/Supabase';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function HistoryScreen() {
  const [scans, setScans] = useState([]); // All scans from DB
  const [filteredScans, setFilteredScans] = useState([]); // Scans after search filter
  const [loading, setLoading] = useState(true); // Loading state while fetching
  const [searchText, setSearchText] = useState(''); // Search input

  // Fetch scans when screen loads
  useEffect(() => {
    fetchScans();
  }, []);

  // Apply search filter whenever search text or scans change
  useEffect(() => {
    if (searchText === '') {
      setFilteredScans(scans);
    } else {
      const filtered = scans.filter(scan =>
        scan.text.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredScans(filtered);
    }
  }, [searchText, scans]);

  // Get scans from Supabase
  const fetchScans = async () => {
    const { data, error } = await supabase
      .from('scans')
      .select('id, text, scanned_at')
      .order('scanned_at', { ascending: false }); // Most recent first

    if (error) {
      console.error('Error fetching scans:', error.message);
    } else {
      setScans(data);
      setFilteredScans(data); // Initially no filter
    }
    setLoading(false);
  };

  // Show loader while fetching
  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#4e9cff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Page title */}
      <Text style={styles.header}>Scan History</Text>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search by text..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Empty state handling */}
      {scans.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your scan history is empty.</Text>
        </View>
      ) : filteredScans.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No results found for "{searchText}".</Text>
        </View>
      ) : (
        // List of scans
        <FlatList
          data={filteredScans}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item.text}</Text>
              <Text style={styles.date}>
                {new Date(item.scanned_at).toLocaleString()}
              </Text>
            </View>
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
