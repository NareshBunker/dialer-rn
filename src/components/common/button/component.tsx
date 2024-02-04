import { ButtonProps } from '@components/common/button/types';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { Text } from 'react-native';

export const Button = (
  {
    title,
    onPress,
    isFull = false,
    isLoading = false,
    type = 'default',
    style = 'filled'
  }: ButtonProps
) => {
  return (
    <View style={styles.wrapper}>
      {isLoading && <ActivityIndicator size={40} color={'#3b82f6'} />}
      {!isLoading && <TouchableOpacity
        style={{
          ...styles.container,
          ...(style === 'filled' ? styles.filled : styles.outlined),
          ...(isFull ? { width: '100%'} : {}),
        }}
        onPress={onPress}
      >
        <Text
          style={{
            ...styles.text,
            ...(style === 'outlined' ? styles.outlinedTxt : {})
          }}
        >{title}</Text>
      </TouchableOpacity>}
    </View>
  );
}