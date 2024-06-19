import React, {forwardRef} from 'react';
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

const AddUpdateTodo = forwardRef<BottomSheetModalMethods, {}>((props, ref) => {
  const {height} = useSafeAreaFrame();

  const {dismiss} = useBottomSheetModal();

  const renderBackDropComponent = (_props: BottomSheetBackdropProps) => {
    return (
      <BottomSheetBackdrop
        {..._props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    );
  };

  const closeSheet = () => {
    dismiss();
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
        <AppTextInput label={'Title'} />
        <AppButton title="Submit" onPress={closeSheet} />
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

export default AddUpdateTodo;
