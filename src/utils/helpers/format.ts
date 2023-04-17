import { IMeasure } from 'deprecated/services/firebase/models/measure';

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return {
    milliseconds: date.getTime(),
    nanoseconds: date.getTime() * 1000000,
  };
};

export const formatMeasureForm = (measure: {
  measureDoc: string;
  quantity: string;
}) => {
  return {
    measureDoc: measure.measureDoc,
    quantity: Number(measure.quantity),
  };
};

export const formatTimeInWeeks = (
  options: { key: string; value: number }[],
  time: string,
): number | null => {
  const result = options.find(item => item.key === time);
  return result ? result.value : null;
};

export const formatMeasureToDefault = (
  measure: { quantity: number; measureDoc: string },
  measureData: IMeasure[],
) => {
  const measureMultiple = measureData.find(
    item => item.doc === measure.measureDoc,
  );

  return measure.quantity * (measureMultiple?.multiple || 0);
};

export const formatFullName = (fullName: string) => {
  return {
    firstName: fullName ? fullName.split(' ').splice(0, 1)[0] : null,
    lastName: fullName ? fullName.split(' ').splice(1).join(' ') : null,
  };
};
