import React, {forwardRef, useEffect, useState} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import {useSafeAreaFrame} from 'react-native-safe-area-context';

import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import AppTextInput from '../AppTextInput';
import AppButton from '../AppButton';
import styles from './styles';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {addTodoItem, updateTodoItem} from '../../../helper';
import {useNotifications} from '../../../App';

const AddUpdateTodo = forwardRef<BottomSheetModalMethods, {}>((props, ref) => {
  const {height} = useSafeAreaFrame();
  const renderBackDropComponent = (_props: BottomSheetBackdropProps) => {
    return (
      <BottomSheetBackdrop
        {..._props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    );
  };

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      overDragResistanceFactor={0}
      enablePanDownToClose={false}
      handleComponent={() => null}
      backdropComponent={renderBackDropComponent}
      maxDynamicContentSize={height}
      enableDynamicSizing={true}
      keyboardBlurBehavior="restore">
      {info => {
        const itemId = info?.data?.id;
        const title = info?.data?.title;
        return <BottomSheetData itemId={itemId} title={title} />;
      }}
    </BottomSheetModal>
  );
});

export default AddUpdateTodo;

const BottomSheetData = ({itemId, title}: {itemId?: string; title: string}) => {
  const [tiTitle, setTitle] = useState('');

  useEffect(() => {
    setTitle(title);
  }, [title]);

  const {notify} = useNotifications();
  const queryClient = useQueryClient();

  const {mutate: addNewTodo, isPending} = useMutation({
    mutationFn: () => {
      return addTodoItem(tiTitle);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todos']});
      setTitle('');
      dismiss();
      notify('success', {
        params: {
          description: 'Added new item',
          title: 'Error',
        },
        config: {
          duration: 200,
        },
      });
    },
    onError: e => {
      notify('error', {
        params: {
          description: e.message,
          title: 'Error',
        },
        config: {
          duration: 200,
        },
      });
    },
  });

  const {mutate: updateTodo, isPending: isUpdating} = useMutation({
    mutationFn: updateTodoItem,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todos']});
      setTitle('');
      dismiss();
      notify('success', {
        params: {
          description: 'Updated item',
          title: 'Success',
        },
        config: {
          duration: 200,
        },
      });
    },
    onError: e => {
      notify('error', {
        params: {
          description: e.message,
          title: 'Error',
        },
        config: {
          duration: 200,
        },
      });
    },
  });

  const {dismiss} = useBottomSheetModal();
  const handleSubmit = () => {
    if (itemId) {
      updateTodo({done: false, id: itemId, title: tiTitle});
    } else {
      addNewTodo();
    }
  };

  return (
    <BottomSheetScrollView contentContainerStyle={styles.sheetContainer}>
      <AppTextInput
        isInBottomSheet={true}
        value={tiTitle}
        onChangeText={setTitle}
        placeholder="Type something"
        placeholderTextColor={'#00000033'}
        label={'Title'}
      />
      <AppButton
        title={itemId ? 'Update' : 'Add'}
        onPress={handleSubmit}
        isLoading={isPending || isUpdating}
      />
    </BottomSheetScrollView>
  );
};
