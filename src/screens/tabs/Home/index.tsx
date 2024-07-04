import React, {useRef, useCallback, useMemo} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Text,
  View,
} from 'react-native';
import {useInfiniteQuery, useMutation} from '@tanstack/react-query';
import {TodoItem, deleteTodoItem, getTodoItems} from '../../../../helper';
import {TabScreensProps} from '../../../types/navigation';
import styles from './styles';
import {
  AddButton,
  AddUpdateTodo,
  Loader,
  TodoListItem,
} from '../../../components';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import typography from '../../../styles/typography';
import {useNotifications} from '../../../../App';
import {useTheme} from '@react-navigation/native';

const PAGE_LIMIT = 6;

const Home: React.FC<TabScreensProps<'Home'>> = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['todos'],
    initialPageParam: 0,
    queryFn: ({pageParam}) => getTodoItems(pageParam, PAGE_LIMIT),
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.length ? lastPageParam + 1 : undefined,
  });

  const {notify} = useNotifications();
  const {colors} = useTheme();
  const addTodoSheetRef = useRef<BottomSheetModal>(null);

  const deleteTodo = useMutation({
    mutationFn: ({id}: {id: string}) => deleteTodoItem(id),
    onSuccess: () => {
      refetch();
      notify('success', {
        params: {
          description: 'Item deleted successfully',
          title: 'Success',
        },
        config: {
          duration: 2000,
        },
      });
    },
    onError: error => {
      notify('error', {
        params: {
          description: error.message,
          title: 'Error',
        },
        config: {
          duration: 2000,
        },
      });
    },
  });

  const handleEditItem = useCallback((props: {id: string; title: string}) => {
    addTodoSheetRef.current?.present(props);
  }, []);

  const renderTodoItem = useCallback<ListRenderItem<TodoItem>>(
    ({item}) => (
      <TodoListItem
        {...item}
        onDelete={deleteTodo.mutate}
        onEdit={handleEditItem}
      />
    ),
    [deleteTodo.mutate, handleEditItem],
  );

  const renderListEmptyComponent = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        {isLoading || isFetching ? (
          <ActivityIndicator size="large" />
        ) : (
          <Text style={typography.caption}>No Todo items found</Text>
        )}
      </View>
    ),
    [isLoading, isFetching],
  );

  const handleOnEndReach = useCallback(() => {
    if (!isFetching && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [isFetching, isFetchingNextPage, hasNextPage, fetchNextPage]);

  const renderListFooterComponent = useCallback(
    () => (isFetchingNextPage ? <ActivityIndicator size="large" /> : null),
    [isFetchingNextPage],
  );

  const flatListData = useMemo(() => data?.pages.flat() || [], [data]);

  return (
    <View
      style={[styles.screenContainer, {backgroundColor: colors.background}]}>
      <FlatList
        data={flatListData}
        renderItem={renderTodoItem}
        onEndReached={handleOnEndReach}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderListEmptyComponent}
        contentContainerStyle={styles.flContainer}
        ListFooterComponent={renderListFooterComponent}
        keyExtractor={(item, index) => `${item.id}-${index}`}
      />
      <AddButton onPress={() => addTodoSheetRef.current?.present()} />
      <AddUpdateTodo ref={addTodoSheetRef} />
      <Loader isLoading={deleteTodo.isPending} />
    </View>
  );
};

export default Home;
