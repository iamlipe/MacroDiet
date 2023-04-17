import { FoodProps } from '@core/domain/models/Food';
import { MealProps } from '@core/domain/models/Meal';

// Função para adicionar um alimento a uma refeição
const addFoodToMeal = (
  meal: MealProps,
  food: FoodProps,
  quantity?: number,
  measureDoc?: string,
) => {
  const existingFoodQuantity =
    meal.foods.find(item => item.foodDoc === food.doc)?.quantity || 0;

  if (!quantity || !measureDoc) {
    return null;
  }

  const updatedQuantity = quantity + existingFoodQuantity;
  const updatedFood = {
    foodDoc: food.doc,
    quantity: updatedQuantity,
    measureDoc,
  };

  return [...meal.foods.filter(item => item.foodDoc !== food.doc), updatedFood];
};

// Função para editar um alimento em uma refeição
const editFoodInMeal = (
  meal: MealProps,
  food: FoodProps,
  quantity?: number,
  measureDoc?: string,
) => {
  if (!quantity || !measureDoc) {
    return null;
  }

  const updatedFood = {
    foodDoc: food.doc,
    quantity: quantity || 0,
    measureDoc: measureDoc || '',
  };
  return [...meal.foods.filter(item => item.foodDoc !== food.doc), updatedFood];
};

// Função para remover um alimento de uma refeição
const removeFoodFromMeal = (meal: MealProps, food: FoodProps) => {
  return meal.foods.filter(item => item.foodDoc !== food.doc);
};

// Função principal que chama as funções auxiliares com base no tipo de operação
export const handleFoodsInMeal = (
  type: 'add' | 'remove' | 'edit',
  meal: MealProps,
  food: FoodProps,
  quantity?: number,
  measureDoc?: string,
) => {
  switch (type) {
    case 'add':
      return addFoodToMeal(meal, food, quantity, measureDoc);
    case 'edit':
      return editFoodInMeal(meal, food, quantity, measureDoc);
    case 'remove':
      return removeFoodFromMeal(meal, food);
    default:
      return meal.foods;
  }
};
