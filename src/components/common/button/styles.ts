import { StyleSheet } from 'react-native';
import { fontFamily } from '@/theme';

const styles = StyleSheet.create({
  wrapper: { flexDirection: 'row', justifyContent: 'center'  },
  container: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    textAlign: 'center',
    alignItems: 'center',
  },
  outlined: {
    borderWidth: 1,
    borderColor: '#3b82f6',
    backgroundColor: '#ffffff',
  },
  outlinedTxt: {
    color: '#3b82f6',
  },
  filled: {
    backgroundColor: '#3b82f6',
  },
  text: {
    color: '#ffffff',
    // fontWeight: 'bold',
    textTransform: 'none',
    fontFamily: fontFamily.PRIMARY,
  }
});

export default styles;