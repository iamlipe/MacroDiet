export const parseNumber = (number: string): number => {
  return isNaN(Number(number))
    ? Number(number.replace(',', '.'))
    : Number(number);
};
