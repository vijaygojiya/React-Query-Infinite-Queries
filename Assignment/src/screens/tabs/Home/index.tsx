import {FlatList, ListRenderItem, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {TabScreensProps} from '../../../types/navigation';
import {useInfiniteQuery} from '@tanstack/react-query';
import {TodoItem, addTodoItem, getTodoItems} from '../../../../helper';
import styles from './styles';
import {AddButton, AddUpdateTodo} from '../../../components';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

const PAGE_LIMIT = 6;

const Home = ({}: TabScreensProps<'Home'>) => {
  const addTodoSheetRef = useRef<BottomSheetModal>(null);
  useEffect(() => {
    add();
  }, []);
  const add = async () => {
    for (let index = 0; index < 10; index++) {
      try {
        await addTodoItem('new test' + index);
      } catch (error) {}
    }
  };
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['todos'],

    initialPageParam: 0,

    queryFn: ({pageParam}) => {
      return getTodoItems(pageParam, PAGE_LIMIT);
    },

    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });
  console.log('=====data', JSON.stringify(data, null, 9));

  const renderTodoItem: ListRenderItem<TodoItem> = ({item, index}) => {
    return <Text>{item.title}</Text>;
  };
  return (
    <View style={styles.screenContainer}>
      <FlatList
        onEndReached={fetchNextPage}
        data={data?.pages.flat()}
        renderItem={renderTodoItem}
      />
      <AddButton
        onPress={() => {
          addTodoSheetRef.current?.present();
        }}
      />
      <AddUpdateTodo ref={addTodoSheetRef} />
    </View>
  );
};

export default Home;
