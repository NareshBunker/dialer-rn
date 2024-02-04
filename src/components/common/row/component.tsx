import { RowProps } from '@components/common/row/types';
import { View } from 'react-native';

import styles from './styles';
import { useMemo } from 'react';

export const Row = ({ children, cols, columnGap = 10, rowGap = 10 }: RowProps) => {
  const defaultStyles = useMemo(() => ({
    flex: cols,
    columnGap: columnGap,
    rowGap: rowGap,
  }), [cols, columnGap, rowGap]);
  
  return (
    <View
      style={{ ...defaultStyles, ...styles.row }}
    >{children}</View>
  );
}