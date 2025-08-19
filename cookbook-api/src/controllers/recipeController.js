// JavaScript
const Recipe = require('../models/Recipe');

exports.createRecipe = async (req, res) => {
  try {
    // Check if the recipe already exists for the user
    const existing = await Recipe.findOne({ strMeal: req.body.strMeal, userId: req.userId });
    if (existing) {
      return res.status(409).json({ error: 'Conflict', message: 'Recipe already exists' });
    }

    // Build ingredient/measure arrays if they arrive as separate fields
    const strIngredients = [];
    const strMeasures = [];
    for (let i = 1; i <= 20; i++) {
      if (req.body[`strIngredient${i}`]) strIngredients.push(req.body[`strIngredient${i}`]);
      if (req.body[`strMeasure${i}`]) strMeasures.push(req.body[`strMeasure${i}`]);
    }

    const recipeData = {
      ...req.body,
      userId: req.userId,
      strIngredients,
      strMeasures,
    };

    const recipe = new Recipe(recipeData);
    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    console.error('Error in createRecipe:', err);
    res.status(500).json({
      error: 'InternalServerError',
      message: 'Server error during recipe creation',
    });
  }
};

exports.getUserRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.userId });
    res.json(recipes);
  } catch (err) {
    console.error('Error in getUserRecipes', err.message);
    res.status(500).json({
      error: 'InternalServerError',
      message: 'Server error during recipe retrieval',
    });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndDelete({
      idMeal: req.params.id,
      userId: req.userId,
    });
    if (!recipe) return res.status(404).json({ error: 'NotFound', message: 'Recipe not found' });
    return res.status(204).end();
  } catch (err) {
    console.error('Error in deleteRecipe', err);
    res.status(500).json({ error: 'InternalServerError', message: 'Server error during deletion' });
  }
};

exports.updateRecipeNote = async (req, res) => {
  try {
    const { id } = req.params; // idMeal
    let { note } = req.body;

    if (typeof note !== 'string')
      return res
        .status(400)
        .json({ error: 'BadRequest', message: 'Missing or invalid note field' });

    note = note.trim(); // still trimmed by Mongoose

    const recipe = await Recipe.findOne({ _id: id, userId: req.userId });
    if (!recipe) return res.status(404).json({ error: 'NotFound', message: 'Recipe not found' });
    recipe.note = note;
    await recipe.save();
    res.status(200).json({
      data: {
        idMeal: recipe._id,
        note: recipe.note,
      },
    });
  } catch (err) {
    console.error('Error in updateRecipeNote', err);
    res
      .status(500)
      .json({ error: 'InternalServerError', message: 'Server error during note update' });
  }
};

exports.deleteRecipeNote = async (req, res) => {
  try {
    const { id } = req.params; // idMeal
    const recipe = await Recipe.findOne({ _id: id, userId: req.userId });
    if (!recipe) return res.status(404).json({ error: 'NotFound', message: 'Recipe not found' });

    if (!recipe.note) return res.status(204).end(); // already empty

    recipe.note = ''; // or: recipe.note = undefined;
    await recipe.save();
    return res.status(204).end(); // no content
  } catch (err) {
    console.error('Error in deleteRecipeNote:', err);
    res
      .status(500)
      .json({ error: 'InternalServerError', message: 'Server error during note deletion' });
  }
};
