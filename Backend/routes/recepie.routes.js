const express=require("express")
const axios=require("axios");
const { authenticate } = require("../middleware/auth");
const {Recipe}=require("../models/index")

const recepieRoute=express.Router()

require("dotenv").config()

recepieRoute.get('/recipes',authenticate, async (req, res) => {
    try {
      const apiKey = process.env.SPOONACULAR_API_KEY;
      const searchTerm = req.query.searchTerm; // Get the search term from query parameters
      const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
        params: {
          apiKey,
          query: searchTerm,
          // You can add more query parameters here for filtering, sorting, etc.
        }
      });
      const recipes = response.data.results;
      res.json(recipes);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching recipes', err:err.message });
    }
});

recepieRoute.post('/save-recipe',authenticate, async (req, res) => {
    const recipeData = req.body;
    const userId = req.user.id
  
    try {
      // Create a new recipe in the database using the Recipe model
      const createdRecipe = await Recipe.create({
        title: recipeData.title,
        image: recipeData.image,
        imageType: recipeData.imageType,
        userId: userId 
      });
  
      console.log('Recipe saved successfully');
      res.json({ message: 'Recipe saved successfully', recipe: createdRecipe });
    } catch (err) {
      res.status(500).json({ error: 'An error occurred while saving the recipe', err:err.message });
    }
});

recepieRoute.get('/save-recipe', authenticate, async (req, res) => {
  const userId = req.user.id; 

  try {
    // Find all recipes associated with the user's ID
    const savedRecipes = await Recipe.findAll({
      where: { userId }
    });

    res.json(savedRecipes);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching saved recipes', err:err.message });
  }
});

recepieRoute.delete("/delete-recipe/:recipeId", authenticate, async (req, res) => {
  const userId = req.user.id;
  const recipeId = req.params.recipeId;

  try {
    // Find the recipe to delete
    const recipeToDelete = await Recipe.findOne({
      where: { id: recipeId, userId },
    });

    if (!recipeToDelete) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Delete the recipe
    await recipeToDelete.destroy();

    res.json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while deleting the recipe', err:err.message });
  }
});


module.exports={recepieRoute}