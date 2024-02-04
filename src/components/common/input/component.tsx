import { TextInput, View, Text } from 'react-native';
import { InputProps } from '@components/common/input/types';
import styles from './styles';

export const Input = ({ label, error, ...props }: InputProps) => {
  return (
    <View>
      {!!label && <Text style={styles.label}>{label}</Text>}
      <TextInput style={{
        ...styles.field,
        ...(!!error ? styles.fieldError : {})
      }} {...props} />
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}