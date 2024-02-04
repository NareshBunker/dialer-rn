import { useState } from 'react';

export const useIsLoading = (defaultValue = false) => {
  const [isLoading, setIsLoading] = useState<boolean>(defaultValue);

  const load = () => {
    setIsLoading(true);
  }
  
  const loadEnd = () => {
    setIsLoading(false);
  }

  return { isLoading, load, loadEnd };
}