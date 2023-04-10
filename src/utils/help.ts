interface IGroupBy<T> {
  arr: T[];
  keySelector: (item: T) => string;
}

export const groupBy = <T>({
  arr,
  keySelector,
}: IGroupBy<T>): { [key: string]: T[] } => {
  return arr.reduce((acc, curr) => {
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

interface BuildOptionFormProps {
  doc?: string;
  title: string;
}

export const buildOptionForm = (raw: BuildOptionFormProps) => {
  return {
    key: raw.doc,
    name: raw.title,
  };
};
