import React, { useState, useEffect } from 'react';
import { Container, Grid, GridItem, Button, Heading, Image, useToast, Box } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import url from './Url';

const MyRecipe = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const toast = useToast();

  useEffect(() => {
    async function fetchSavedRecipes() {
      try {
        const token = Cookies.get('token');
        const response = await fetch(`${url}save-recipe`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setSavedRecipes(data);
        } else {
          console.error('Error fetching saved recipes:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching saved recipes:', error);
      }
    }

    fetchSavedRecipes();
  }, []);

  const handleDeleteRecipe = async (recipeId) => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(`${url}delete-recipe/${recipeId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        toast({
          title: 'Recipe Deleted',
          description: 'Recipe has been successfully deleted.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        // Update savedRecipes state after deleting
        setSavedRecipes(savedRecipes.filter(recipe => recipe.id !== recipeId));
      } else {
        toast({
          title: 'Error',
          description: 'An error occurred while deleting the recipe. Please try again later.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
      toast({
        title: 'Error',
        description: 'Server error occurred. Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container>
      <Heading as="h1" mb={4}>My Saved Recipes</Heading>
      {savedRecipes.length === 0 ? (
        <Box mt={4}>
          <Heading as="h2" size="md">No Saved Recipes</Heading>
        </Box>
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(3, 1fr))" gap={4}>
          {savedRecipes.map(recipe => (
            <GridItem key={recipe.id} p={4} borderRadius="lg" boxShadow="md" bg="white">
              <Image src={recipe.image} alt={recipe.title} objectFit="cover" h="200px" width="100%" mb={2} />
              <Heading as="h2" size="md" mb={2}>{recipe.title}</Heading>
              <Button onClick={() => handleDeleteRecipe(recipe.id)} colorScheme="red">Delete Recipe</Button>
            </GridItem>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default MyRecipe;
