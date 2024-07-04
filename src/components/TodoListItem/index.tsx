import React from 'react';
import {StyleSheet, View, Text, Pressable, Alert} from 'react-native';
import typography from '../../styles/typography';
import {TodoItem} from '../../../helper';
import {Delete, Edit} from '../../assets';

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
      <Text style={[typography.body, styles.text]}>{title}</Text>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.editButton} onPress={handleEditItem}>
          <Edit />
        </Pressable>
        <Pressable style={styles.deleteButton} onPress={handleDeleteItem}>
          <Delete />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    rowGap: 8,
  },
  text: {flex: 1},
  buttonsContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  editButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  deleteButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default TodoListItem;
