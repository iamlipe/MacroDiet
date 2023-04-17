interface IGroupBy<T> {
  arr: T[];
  keySelector: (item: T) => string;
}

export const groupBy = <T>({
  arr,
  keySelector,
}: IGroupBy<T>): { [key: string]: T[] } => {
  return arr.reduce((acc: { [key: string]: T[] }, curr: T) => {
    const key = keySelector(curr);
    return {
      ...acc,
      [key]: [...(acc[key] || []), curr],
    };
  }, {});
};

interface ISectionListData<T> {
  title: string;
  data: T[];
}

export const toSectionListData = <T>(
  object: Record<string, T[]>,
): ISectionListData<T>[] => {
  return Object.entries(object).map(([title, data]) => ({
    title,
    data,
  }));
};

export const buildOptionForm = (raw: { doc: string; title: string }) => {
  return {
    key: raw.doc,
    name: raw.title,
  };
};

export const firstLetterUppercase = (data: string) => {
  return data[0].toUpperCase() + data.substring(1);
};

export const parseNumber = (number: string | number) => {
  return isNaN(Number(number))
    ? Number(`${number}`.replace(',', '.'))
    : Number(number);
};

interface IHandleSearch<T> {
  search: string;
  data: T[] | null;
  keySearch: keyof T;
}

type SearchResult<T> = T[];

export const searchData = <T>({
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

export const removeUndefined = (obj: Record<string, any>) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] === undefined) {
      delete obj[key];
    }
  }
  return obj;
};

export type Replace<T, R> = Omit<T, keyof R> & R;
