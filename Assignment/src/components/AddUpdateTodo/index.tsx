import React, {forwardRef, useState} from 'react';
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
import {addTodoItem} from '../../../helper';

const AddUpdateTodo = forwardRef<BottomSheetModalMethods, {}>((props, ref) => {
  const [tiTitle, setTitle] = useState('');
  const {height} = useSafeAreaFrame();
  const queryClient = useQueryClient();
  const {mutate} = useMutation({
    mutationFn: ({title}: {title: string}) => {
      return addTodoItem(title);
    },
    onSuccess: () => {
      console.log('succss');
      queryClient.invalidateQueries({queryKey: ['todos']});
      dismiss();
    },
    onError: e => {
      console.log(e.message);
    },
  });

  const {dismiss} = useBottomSheetModal();
  const addNewTodo = () => {
    mutate({title: tiTitle});
  };
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
      android_keyboardInputMode="adjustResize"
      maxDynamicContentSize={height}
      keyboardBlurBehavior={'restore'}
      keyboardBehavior="interactive"
      enableDynamicSizing={true}>
      <BottomSheetScrollView
        contentContainerStyle={styles.sheetContainer}
        overScrollMode={'never'}
        bounces={false}>
        <AppTextInput value={tiTitle} onChangeText={setTitle} label={'Title'} />
        <AppButton title="Add" onPress={addNewTodo} />
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

export default AddUpdateTodo;
