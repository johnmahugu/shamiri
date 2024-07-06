import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface EntryItemProps {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const EntryItem: React.FC<EntryItemProps> = ({ id, title, content, category, date, onDelete, onEdit }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.date}>{date}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => onEdit(id)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => onDelete(id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    marginVertical: 8,
  },
  category: {
    fontStyle: 'italic',
    color: '#666',
  },
  date: {
    color: '#999',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: '#FF0000',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EntryItem;
