import { parseNumber } from './help';

const computeKcalPerGram = (
  carb: number,
  prot: number,
  totalFat: number,
  portion: number,
) => {
  return (carb * 4 + prot * 4 + totalFat * 9) / portion;
};

const computeNutrientPerGram = (
  nutrient: string | number,
  portion: string | number,
) => {
  return parseNumber(nutrient) / parseNumber(portion);
};

interface HandleInfoFoodProps {
  portion: string | number;
  carb: string | number;
  prot: string | number;
  totalFat: string | number;
  saturatedFat: string | number;
  transFat: string | number;
  sodium?: string | number;
  fiber?: string | number;
}

export const handleInfoFood = ({
  carb,
  fiber,
  portion,
  prot,
  saturatedFat,
  sodium,
  totalFat,
  transFat,
}: HandleInfoFoodProps) => {
  return {
    carbPerGram: computeNutrientPerGram(carb, portion),
    protPerGram: computeNutrientPerGram(prot, portion),
    fatPerGram: computeNutrientPerGram(totalFat, portion),
    fiberPerGram: computeNutrientPerGram(fiber || 0, portion),
    sodiumPerGram: parseNumber(sodium || 0) / (parseNumber(portion) * 1000),
    kcalPerGram: computeKcalPerGram(
      parseNumber(carb),
      parseNumber(prot),
      parseNumber(totalFat),
      parseNumber(portion),
    ),
    saturatedFatPerGram: computeNutrientPerGram(saturatedFat, portion),
    transFatPerGram: computeNutrientPerGram(transFat, portion),
  };
};
