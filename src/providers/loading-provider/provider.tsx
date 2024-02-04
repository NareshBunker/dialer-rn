import { createContext, ReactNode, useContext } from 'react';
import { LoadingProviderProps } from '@/providers/loading-provider/types';
import { useIsLoading } from '@/hooks';
import { LoadingScreen } from '@components/loading';

const LoadingContext = createContext<LoadingProviderProps>({
  isLoading: false,
  load: () => {},
  loadEnd: () => {},
});

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const { isLoading, load, loadEnd } = useIsLoading(true);
  
  return (
    <LoadingContext.Provider value={{
      isLoading,
      load,
      loadEnd,
    }}>
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoadingContext = () => useContext(LoadingContext);