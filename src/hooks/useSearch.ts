import { useCallback } from 'react';

interface HandleSearchProps<T> {
  search: string;
  data: T[] | null;
  keySearch: keyof T;
}

type SearchResult<T> = T[];

export const useSearch = <T>() => {
  const handleSearch = useCallback(
    ({ search, data, keySearch }: HandleSearchProps<T>): SearchResult<T> => {
      if (!data) {
        return [];
      }

      const result = data.filter(item => {
        const key = item[keySearch] as string;
        return key.toLowerCase().includes(search.toLowerCase());
      });

      return result;
    },
    [],
  );

  return { handleSearch };
};
