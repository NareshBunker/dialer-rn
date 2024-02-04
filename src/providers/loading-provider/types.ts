export interface LoadingProviderProps {
  isLoading: boolean;
  load: () => void;
  loadEnd: () => void;
}