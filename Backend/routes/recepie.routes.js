const express=require("express")
const axios=require("axios")

const recepieRoute=express.Router()

require("dotenv").config()

recepieRoute.get('/recipes', async (req, res) => {
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
    } catch (error) {
      res.status(500).json({ error: 'Error fetching recipes' });
    }
  });

module.exports={recepieRoute}