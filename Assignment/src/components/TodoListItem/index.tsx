import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import typography from '../../styles/typography';
import {TodoItem} from '../../../helper';

interface TodoListItemProps extends TodoItem {
  onEdit?: (pros: {id: string; title: string}) => void;
  onDelete?: ({id}: {id: string}) => void;
}

const TodoListItem = ({title, id, onEdit, onDelete}: TodoListItemProps) => {
  const handleDeleteItem = () => {
    Alert.alert('', 'Are you sure want to delete this item', [
      {
        text: 'Yes',
        onPress: () => {
          onDelete?.({id});
        },
      },
      {text: 'No'},
    ]);
  };

  const handleEditItem = () => {
    onEdit?.({id, title});
  };

  return (
    <View style={styles.container}>
      <Text style={typography.body}>{title}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.editButton} onPress={handleEditItem}>
          <Text style={typography.bodyBold}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteItem}>
          <Text style={typography.bodyBold}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default TodoListItem;
