// JavaScript
const express = require('express');
const axios = require('axios');
const router = express.Router();
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Cerca pasto per nome
router.get('/search-by-name', async (req, res) => {
  try {
    const { s } = req.query;
    const response = await axios.get(`${BASE_URL}/search.php?s=${s}`);
    res.json(response.data);
  } catch (err) {
    console.error('Error searching meal by name:', err);
    res.status(500).json({
      error: 'InternalServerError',
      message: 'Error searching meal by name',
    });
  }
});

// Lista pasti per lettera
router.get('/search-by-letter', async (req, res) => {
  try {
    const { f } = req.query;
    const response = await axios.get(`${BASE_URL}/search.php?f=${f}`);
    res.json(response.data);
  } catch (err) {
    console.error('Error searching meal by letter:', err);
    res.status(500).json({
      error: 'Error searching meal by letter',
      message: 'Error searching by letter',
    });
  }
});

// Dettagli pasto per id
router.get('/lookup', async (req, res) => {
  try {
    const { i } = req.query;
    const response = await axios.get(`${BASE_URL}/lookup.php?i=${i}`);
    res.json(response.data);
  } catch (err) {
    console.error('Error in meal lookup', err);
    res.status(500).json({
      error: 'InternalServerError',
      message: 'Error in meal lookup',
    });
  }
});

// Pasto casuale
router.get('/random', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/random.php`);
    res.json(response.data);
  } catch (err) {
    console.error('Error searching for random meal', err);
    res.status(500).json({
      error: 'InternalServerError',
      message: 'Error searching for random meal',
    });
  }
});

// Tutte le categorie
router.get('/categories', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/categories.php`);
    res.json(response.data);
  } catch (err) {
    console.log('Error retrieving categories:', err);
    res.status(500).json({
      error: 'InternalServerError',
      message: 'Error retrieving categories',
    });
  }
});

// Lista categorie, aree, ingredienti
router.get('/list', async (req, res) => {
  try {
    const { type } = req.query; // type: c, a, i
    const response = await axios.get(`${BASE_URL}/list.php?${type}=list`);
    res.json(response.data);
  } catch (err) {
    console.error('Error retrieving the list:', err);
    res.status(500).json({
      error: 'InternalServerError',
      message: 'Error retrieving the list',
    });
  }
});

// Filtra per ingrediente
router.get('/filter-by-ingredient', async (req, res) => {
  try {
    const { i } = req.query;
    const response = await axios.get(`${BASE_URL}/filter.php?i=${i}`);
    res.json(response.data);
  } catch (err) {
    console.error('Error retrieving the list by ingredient:', err);
    res.status(500).json({
      error: 'InternalServerError',
      message: 'Error retrieving the list by ingredient',
    });
  }
});

// Filtra per categoria
router.get('/filter-by-category', async (req, res) => {
  try {
    const { c } = req.query;
    const response = await axios.get(`${BASE_URL}/filter.php?c=${c}`);
    res.json(response.data);
  } catch (err) {
    console.error('Error retrieving the list by category:', err);
    res.status(500).json({
      error: 'InternalServerError',
      message: 'Error retrieving the list by category',
    });
  }
});

// Filtra per area
router.get('/filter-by-area', async (req, res) => {
  try {
    const { a } = req.query;
    const response = await axios.get(`${BASE_URL}/filter.php?a=${a}`);
    res.json(response.data);
  } catch (err) {
    console.error('Error retrieving the list by area:', err);
    res.status(500).json({
      error: 'InternalServerError',
      message: 'Error retrieving the list by area',
    });
  }
});

router.get('/count', async (req, res) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  let total = 0;

  try {
    for (const letter of alphabet) {
      const response = await axios.get(`${BASE_URL}/search.php?f=${letter}`);
      const meals = response.data.meals;
      if (meals) total += meals.length;
    }
    res.json({ count: total });
  } catch (err) {
    console.error('Error counting recipes:', err);
    res.status(500).json({
      error: 'InternalServerError',
      message: 'Error counting recipes',
    });
  }
});

module.exports = router;
