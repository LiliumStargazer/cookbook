// JavaScript
const Recipe = require('../models/Recipe');

exports.createRecipe = async (req, res) => {
  try {
    // Verifica se la ricetta esiste già per l'utente
    const existing = await Recipe.findOne({ strMeal: req.body.strMeal, userId: req.userId });
    if (existing) {
      return res.status(409).json({ error: 'Conflict', message: 'Ricetta già presente' });
    }

    // Costruisci gli array ingredienti/misure se arrivano come campi separati
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
    console.error('Errore in login:', err);
    res
      .status(500)
      .json({
        error: 'InernalServerError',
        message: 'Errore del server nella creazione della ricetta',
      });
  }
};

exports.getUserRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.userId });
    res.json(recipes);
  } catch (err) {
    console.error('Errore in getting user recipes', err.message);
    res.status(500).json({
      error: 'InernalServerError',
      message: 'Errore del server nel recupero delle ricette',
    });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndDelete({
      idMeal: req.params.id,
      userId: req.userId,
    });
    if (!recipe) return res.status(404).json({ error: 'NotFound', message: 'Ricetta non trovata' });
    return res.status(204).end();
  } catch (err) {
    console.error('Errore in deleteRecipe', err);
    res
      .status(500)
      .json({ error: 'InernalServerError', message: 'Errore del server in nella cancellazione' });
  }
};

exports.updateRecipeNote = async (req, res) => {
  try {
    const { id } = req.params; // idMeal
    let { note } = req.body;

    if (typeof note !== 'string')
      return res
        .status(400)
        .json({ error: 'BadRequest', message: 'Campo note mancante o non valido' });

    note = note.trim(); // viene comunque ritagliata anche da Mongoose

    const recipe = await Recipe.findOne({ _id: id, userId: req.userId });
    if (!recipe) return res.status(404).json({ error: 'NotFound', message: 'Ricetta non trovata' });
    recipe.note = note;
    await recipe.save();
    res.status(200).json({
      data: {
        idMeal: recipe._id,
        note: recipe.note,
      },
    });
  } catch (err) {
    console.error('Errore in updateRecipeNote', err);
    res
      .status(500)
      .json({ error: 'InernalServerError', message: 'Errore del server in aggiornamento nota' });
  }
};

exports.deleteRecipeNote = async (req, res) => {
  try {
    const { id } = req.params; // idMeal
    const recipe = await Recipe.findOne({ _id: id, userId: req.userId });
    if (!recipe) return res.status(404).json({ error: 'NotFound', message: 'Ricetta non trovata' });

    if (!recipe.note) return res.status(204).end(); // già vuota

    recipe.note = ''; // oppure: recipe.note = undefined;
    await recipe.save();
    return res.status(204).end(); // nessun contenuto
  } catch (err) {
    console.error('Errore delete nota:', err);
    res
      .status(500)
      .json({ error: 'InernalServerError', message: 'Errore del server in cancellazione nota' });
  }
};
