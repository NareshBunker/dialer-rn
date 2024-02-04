export interface BadgeProps {
  type: 'success' | 'pending' | 'info';
  text: string;
  size?: 'small' | 'medium';
  txtAlign?: 'left' | 'center' | 'right';
  style?: 'bg' | 'border';
}