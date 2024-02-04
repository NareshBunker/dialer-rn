import { StyleSheet } from 'react-native';
import { fontFamily } from '@/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 25,
    backgroundColor: '#ffffff',
  },
  title: {
    // fontWeight: 'bold',
    fontSize: 34,
    fontFamily: fontFamily.PRIMARY
  },
  border: {
    marginTop: 8,
    borderBottomColor: '#0000004D',
    borderBottomWidth: 0.3,
  }
});

export default styles;
