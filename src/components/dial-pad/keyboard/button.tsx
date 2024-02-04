import { KeyboardButtonProps } from '@components/dial-pad/keyboard/types';
import styles from './styles';
import { Text, View } from 'react-native';


export const DialPadButton = ({ item }: KeyboardButtonProps) => {
  return (
    <View style={{
      ...styles.buttonContainer,
      // borderWidth: item.isActive ? 1 : 0,
    }}>
      <Text style={styles.buttonText}>{item.label}</Text>
    </View>
  );
}