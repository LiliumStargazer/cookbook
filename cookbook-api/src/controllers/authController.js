const User = require('../models/User');
const Recipe = require('../models/Recipe');
const Review = require('../models/Review');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validateUserData = require('../utils/validateUser');
const validateUserUpdate = require('../utils/validateUserUpdate');

exports.register = async (req, res) => {
  const error = validateUserData(req.body);
  if (error) {
    console.error(error);
    return res.status(400).json({ error: 'BadRequest', message: 'Campo mancante o non valido' });
  }
  try {
    const { username, password, email, favoriteDishes } = req.body;

    // Verifica se username già esiste
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: 'BadRequest', message: 'Username già in uso' });
    }

    // Verifica se email già esiste
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: 'BadRequest', message: 'Email già in uso' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed, email, favoriteDishes });
    await user.save();
    res.status(201).send('Utente registrato e ricettario creato');
  } catch (err) {
    console.error('Errore in register:', err);
    res
      .status(500)
      .json({ error: 'InernalServerError', message: 'Errore del server durante la registrazione' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: 'BadRequest', message: 'Email e password sono obbligatori' });
    }
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Unauthorized', message: 'Password non valida' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    const userWithoutPassword = {
      // Restituisci user senza password
      _id: user._id,
      username: user.username,
      email: user.email,
      favoriteDishes: user.favoriteDishes,
    };

    res.json({
      token,
      userData: userWithoutPassword,
    });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ error: 'InernalServerError', message: 'Errore del server durante il login' });
  }
};

exports.updateUser = async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ error: 'Unauthorized', message: 'Utente non autorizzato' });
  }
  const error = validateUserUpdate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ error: 'BadRequest', message: 'Email e password sono obbligatori' });
  }
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.userId, updates, { new: true });
    if (!user) return res.status(400).json({ error: 'BadRequest', message: 'Utente non trovato' });
    res.json(user);
  } catch (err) {
    console.error('Errore nella cancellazione', err);
    res.status(500).json({
      error: 'InernalServerError',
      message: "Errore del server durante l'aggiornamento dell'utente",
    });
  }
};

// memo: il middeware auth.js estrae il token prima di chiamare questa funzione e riconosce l'utente.
exports.deleteUser = async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ error: 'Unauthorized', message: 'Utente non autorizzato' });
  }

  try {
    // Verifica che l'utente esista prima di eliminarlo
    const user = await User.findById(req.userId);
    if (!user) {
      console.error('Utente non trovato:', req.userId);
      return res.status(404).json({
        success: false,
        error: 'Utente non trovato',
      });
    }

    // Elimina l'utente e tutti i dati correlati
    await Promise.all([
      User.findByIdAndDelete(req.userId),
      Recipe.deleteMany({ userId: req.userId }),
      Review.updateMany({ userId: req.userId }, { $set: { username: 'Deleted user' } }), // non cancello le recensioni dell'utente ma imposto sulle recensioni che l'utente è stato eliminato
    ]);

    res.json({
      success: true,
      message: 'Account eliminato con successo',
    });
  } catch (error) {
    console.error('Errore durante eliminazione account:', error.message);
    res.status(500).json({
      success: false,
      error: 'InernalServerError',
      message: "Errore del server durante l'eliminazione",
    });
  }
};

exports.countUsers = async (req, res) => {
  if (!req.userId)
    return res.status(401).json({ error: 'Unauthorized', message: 'Utente non autorizzato' });
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ error: 'InernalServerError', message: 'Errore del server nel conteggio utenti:' });
  }
};
