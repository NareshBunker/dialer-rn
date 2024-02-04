import { ReactNode } from 'react';
import { ViewProps } from 'react-native';

export interface WrapperProps extends ViewProps {
  children: ReactNode;
  title?: string;
  isScrollable?: boolean;
}