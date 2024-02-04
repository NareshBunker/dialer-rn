import { BoldTextProps } from '@components/common/bold-text/types';
import { Text } from 'react-native';

import styles from './styles';

export const BoldText = ({ text }: BoldTextProps) => {
  return (
    <Text style={styles.text}>{text}</Text>
  );
}