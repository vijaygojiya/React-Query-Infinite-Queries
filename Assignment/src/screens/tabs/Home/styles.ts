import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  screenContainer: {flex: 1, backgroundColor: '#fff'},
  flContainer: {
    paddingHorizontal: 20,
    flexGrow: 1,
    rowGap: 14,
    paddingTop: 22,
    paddingBottom: 56,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
