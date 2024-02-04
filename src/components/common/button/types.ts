export interface ButtonProps {
    title: string;
    onPress: () => void;
    isFull?: boolean;
    isLoading?: boolean;
    type?: 'error' | 'default';
    style?: 'filled' | 'outlined'
}