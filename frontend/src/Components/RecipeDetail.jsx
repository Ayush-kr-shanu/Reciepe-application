import React, { useState, useEffect } from 'react';
import { Container, Heading, Image, Text, Box, VStack, HStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import url from './Url';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState({});
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`${url}get-recipe/${id}`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setRecipeDetails(data);
        } else {
          console.error('Error fetching recipe details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    fetchRecipeDetails();
  }, [id, token]);

  return (
    <Container>
      <Heading as="h1" mb={4}>{recipeDetails.name}</Heading>
      <Image src={recipeDetails.image} alt={recipeDetails.name} objectFit="cover" h="300px" width="100%" mb={4} />

      <VStack spacing={4} align="start">
        {recipeDetails.steps.map((step) => (
          <Box key={step.number} border="1px solid #ccc" borderRadius="md" p={4}>
            <Text fontSize="xl" fontWeight="bold">Step {step.number}</Text>
            <Text>{step.step}</Text>

            <HStack mt={2}>
              {step.ingredients.length > 0 && (
                <Box>
                  <Text fontSize="lg" fontWeight="bold">Ingredients:</Text>
                  {step.ingredients.map((ingredient) => (
                    <Text key={ingredient.id}>{ingredient.name}</Text>
                  ))}
                </Box>
              )}

              {step.equipment.length > 0 && (
                <Box>
                  <Text fontSize="lg" fontWeight="bold">Equipment:</Text>
                  {step.equipment.map((equipment) => (
                    <Text key={equipment.id}>{equipment.name}</Text>
                  ))}
                </Box>
              )}
            </HStack>

            {step.length && (
              <Text mt={2}>Time: {step.length.number} {step.length.unit}</Text>
            )}
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default RecipeDetails;
