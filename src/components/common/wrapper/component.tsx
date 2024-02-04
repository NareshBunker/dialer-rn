import { WrapperProps } from '@components/common/wrapper/types';
import { View, Text, ScrollView } from 'react-native';

import styles from './styles';

export const Wrapper = ({ children, title = '', isScrollable = false, style = {}, ...props }: WrapperProps) => {
  if (isScrollable) {
    return (
      <ScrollView style={{ ...styles.container, ...style as any }} {...props}>
        {title && <View style={{ marginBottom: 20 }}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.border}></View>
        </View>}
        {children}
      </ScrollView>
    );
  }
  
  return (
    <View style={{ ...styles.container, ...style as any }} {...props}>
      {title && <View style={{ marginBottom: 20 }}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.border}></View>
      </View>}
      {children}
    </View>
  );
}