// JavaScript
const Recipe = require('../models/Recipe');

exports.createRecipe = async (req, res) => {
    try {
        // Verifica se la ricetta esiste già per l'utente
        const existing = await Recipe.findOne({ strMeal: req.body.strMeal, userId: req.userId });
        if (existing) {
            return res.status(409).send('Ricetta già presente');
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
            strMeasures
        };

        const recipe = new Recipe(recipeData);
        await recipe.save();
        res.status(201).json(recipe);
    } catch (err){
        console.log('Errore dettagliato:', err);
        res.status(500).send('Errore nella creazione della ricetta');
    }
};

exports.getUserRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.userId });
    console.log('Ricette trovate:', recipes);
    res.json(recipes);
  } catch   {
    res.status(500).send('Errore nel recupero delle ricette');
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
      const recipe = await Recipe.findOneAndDelete({
          idRecipe: req.params.id,
          userId: req.userId
      });
    if (!recipe) return res.status(404).send('Ricetta non trovata');
    res.send('Ricetta eliminata');
  } catch (err) {
    res.status(500).send('Errore nella cancellazione');
  }
};

exports.updateRecipeNote = async (req, res) => {
    try {
        const { id } = req.params;          // idRecipe
        let { note } = req.body;

        if (typeof note !== 'string')
            return res.status(400).json({ error: 'Campo note mancante o non valido' });

        note = note.trim(); // verrà comunque ritagliata anche da Mongoose


        const recipe = await Recipe.findOne({ _id: id, userId: req.userId });
        console.warn('ricetta:', recipe);
        if (!recipe) return res.status(404).json({ error: 'Ricetta non trovata' });

        recipe.note = note;            // '' permette di cancellare
        await recipe.save();

        res.json({ idRecipe: recipe._id, note: recipe.note });
    } catch (err) {
        console.error('Errore update nota:', err);
        res.status(500).json({ error: 'Errore aggiornamento nota' });
    }
};

exports.deleteRecipeNote = async (req, res) => {
    try {
        const { id } = req.params; // idRecipe
        const recipe = await Recipe.findOne({ _id: id, userId: req.userId });
        if (!recipe) return res.status(404).json({ error: 'Ricetta non trovata' });

        if (!recipe.note) return res.status(204).end(); // già vuota

        recipe.note = ''; // oppure: recipe.note = undefined;
        await recipe.save();
        return res.status(204).end(); // nessun contenuto
        // In alternativa: res.json({ idRecipe: recipe.idRecipe, note: recipe.note });
    } catch (err) {
        console.error('Errore delete nota:', err);
        res.status(500).json({ error: 'Errore cancellazione nota' });
    }
};