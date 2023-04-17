interface IHandleSearch<T> {
  search: string;
  data: T[] | null;
  keySearch: keyof T;
}

type SearchResult<T> = T[];

export const handleSearch = <T>({
  search,
  data,
  keySearch,
}: IHandleSearch<T>): SearchResult<T> => {
  if (!data) {
    return [];
  }

  const result = data.filter(item => {
    const key = item[keySearch] as unknown as string;
    return key.toLowerCase().includes(search.toLowerCase());
  });

  return result;
};
