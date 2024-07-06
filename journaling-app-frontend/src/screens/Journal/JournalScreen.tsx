import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/api';
import EntryItem from '../../components/EntryItem';

const JournalScreen = () => {
  const [entries, setEntries] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await api.get('/journal', {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setEntries(response.data.entries);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEntries();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Journal Entries</Text>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <EntryItem entry={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default JournalScreen;
