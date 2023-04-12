export const timeToGoal = (
  weightQuantity: number,
  goalWeightQuantity: number,
) => {
  const isBulking = goalWeightQuantity > weightQuantity;
  const alternativeFactor = isBulking ? 0.5 : 1;
  const recommendedFactor = isBulking ? 0.25 : 0.5;
  const weightDiff = Math.abs(goalWeightQuantity - weightQuantity);
  const recommended = weightDiff / recommendedFactor;
  const alternative = weightDiff / alternativeFactor;

  return [
    {
      key: '1',
      value: recommended,
      name: `${recommended} semanas`,
      description: 'recomendado',
    },
    {
      key: '2',
      value: alternative,
      name: `${alternative} semanas`,
    },
  ];
};
