import { BadgeProps } from '@components/common/badge/types';
import { useMemo } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

export const Badge = ({ type, text, size = 'medium', style = 'border' }: BadgeProps) => {
  const bgColor = useMemo(() => {
    if (type === 'success') return '#10b981';
    if (type === 'pending') return '#f59e0b';
    if (type === 'info') return '#3b82f6';
  }, [type]);
  
  const padding = useMemo(() => {
    if (size === 'small') return { paddingHorizontal: 15, paddingVertical: 2 };
    return {
      paddingVertical: 6,
      paddingHorizontal: 10,
    };
  }, [size]);
  
  const styleStyles = useMemo(() => {
    let result: any = {};
    if (style === 'bg') {
      result = {
        text: {
          color: '#ffffff',
        },
        container: {
          backgroundColor: bgColor,
        }
      };
    }
    if (style === 'border') {
      result = {
        text: {
          color: '#000000',
        },
        container: {
          borderLeftColor: bgColor,
          borderLeftWidth: 10,
          borderWidth: 1,
          borderColor: bgColor,
        }
      };
    }
    return result;
  }, [bgColor, style])
  
  return (
    <View style={{
      ...styleStyles.container,
      borderRadius: 10,
    }}>
      <Text style={{
        ...styles.badge,
        ...padding,
        ...styleStyles.text,
      }}>{text}</Text>
    </View>
  );
}