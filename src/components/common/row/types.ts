import { ReactNode } from 'react';

export interface RowProps {
  children: ReactNode;
  cols: number;
  columnGap?: number;
  rowGap?: number;
}