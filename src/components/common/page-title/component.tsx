import { PageTitleProps } from '@components/common/page-title/types';
import { Text, View } from 'react-native';
import styles from './styles';

export const PageTitle = ({ title, withBorder = false }: PageTitleProps) => {
  return (
    <View>
      <Text style={styles.txt}>{title}</Text>
      <View style={styles.border}></View>
    </View>
  );
}