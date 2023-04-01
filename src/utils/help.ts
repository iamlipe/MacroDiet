interface GroupByProps<T> {
  arr: T[];
  keySelector: (item: T) => string;
}

export const groupBy = <T>({
  arr,
  keySelector,
}: GroupByProps<T>): { [key: string]: T[] } => {
  return arr.reduce((acc, curr) => {
    const key = keySelector(curr);
    return {
      ...acc,
      [key]: [...(acc[key] || []), curr],
    };
  }, {});
};

interface SectionListData<T> {
  title: string;
  data: T[];
}

export const toSectionListData = <T>(
  object: Record<string, T[]>,
): SectionListData<T>[] => {
  return Object.entries(object).map(([title, data]) => ({
    title,
    data,
  }));
};
