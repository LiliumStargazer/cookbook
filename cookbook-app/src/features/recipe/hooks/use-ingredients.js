// Hook per estrarre ingredienti da un meal object
export function useIngredients(meal) {
    if (!meal) return [];

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredients.push({
                ingredient: ingredient.trim(),
                measure: measure?.trim() || ''
            });
        }
    }

    return ingredients;
}

