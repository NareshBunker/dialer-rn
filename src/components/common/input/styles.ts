import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  label: {
    fontFamily: 'SpaceMono',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  field: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  fieldError: {
    backgroundColor: '#ffdede',
    borderColor: '#ff0000'
  },
  error: {
    fontSize: 12,
    color: '#ff0000',
    fontWeight: 'bold',
  }
});

export default styles;