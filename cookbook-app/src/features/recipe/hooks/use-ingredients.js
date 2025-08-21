// Hook per estrarre ingredienti da un meal object
export function useIngredients(meal) {
  if (!meal) return [];

  const ingredients = [];
  // 20 is the maximum number of ingredients in a meal object in properties like strIngredient1, strIngredient2, etc.
  // We loop through these properties to extract the ingredients and their measures.
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure?.trim() || '',
      });
    }
  }

  return ingredients;
}
