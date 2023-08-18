import React, { useState } from 'react';
import { Input, Button, Container, Box, Heading, Grid, GridItem, Image, useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import url from './Url';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const toast = useToast();

  const handleSearch = async () => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(`${url}recipes?searchTerm=${searchTerm}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setRecipes(data);
      } else {
        console.error('Error fetching recipes:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleSaveRecipe = async (recipe) => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(`${url}save-recipe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          title: recipe.title,
          image: recipe.image,
          imageType: recipe.imageType,
        }),
      });

      if (response.ok) {
        toast({
          title: 'Recipe Saved',
          description: 'Recipe has been successfully saved.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Error',
          description: 'An error occurred while saving the recipe. Please try again later.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error creating post:', error);
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
      <Heading as="h1" mb={4}>Search Recipes</Heading>
      <Box>
        <Input
          type="text"
          placeholder="Enter a keyword..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <Button onClick={handleSearch} mt={2} colorScheme="blue">Search</Button>
      </Box>
      <Grid mt={4} templateColumns="repeat(auto-fill, minmax(3, 1fr))" gap={4}>
        {recipes.map(recipe => (
          <GridItem key={recipe.id} p={4} borderRadius="lg" boxShadow="md" bg="white">
            <Image src={recipe.image} alt={recipe.title} objectFit="cover" h="200px" width="100%" mb={2} />
            <Heading as="h2" size="md" mb={2}>{recipe.title}</Heading>
            <Button onClick={() => handleSaveRecipe(recipe)} colorScheme="red">Save Recipe</Button>
            <Link to={`/recipe/${recipe.id}`}><Button mt={2} colorScheme="blue">Read More</Button></Link>
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
};

export default Search;
