interface IGroupBy<T> {
  arr: T[];
  keySelector: (item: T) => string;
}

interface ISectionListData<T> {
  title: string;
  data: T[];
}

interface IHandleSearch<T> {
  search: string;
  data: T[] | null;
  keySearch: keyof T;
}

type SearchResult<T> = T[];

export type Replace<T, R> = Omit<T, keyof R> & R;

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

export const enumerateDaysBetweenDates = (startDate: Date) => {
  let currentDate = startDate;

  const today = new Date();

  const days = [];

  while (currentDate <= today) {
    days.push(new Date(startDate).toDateString());

    currentDate.setDate(currentDate.getDate() + 1);
  }

  days.push(new Date(startDate).toDateString());

  return days;
};
