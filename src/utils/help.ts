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

interface SectionListDataProps<T> {
  title: string;
  data: T[];
}

export const toSectionListData = <T>(
  object: Record<string, T[]>,
): SectionListDataProps<T>[] => {
  return Object.entries(object).map(([title, data]) => ({
    title,
    data,
  }));
};

interface BuildOptionFormProps {
  id: string;
  title: string;
}

export const buildOptionForm = (raw: BuildOptionFormProps) => {
  return {
    key: raw.id,
    name: raw.title,
  };
};
