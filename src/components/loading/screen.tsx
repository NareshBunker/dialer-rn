import { ActivityIndicator, Text, View } from 'react-native';
import styles from './styles';

export const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={'#3b82f6'} />
      <Text style={styles.text}>Loading your data...</Text>
    </View>
  );
}