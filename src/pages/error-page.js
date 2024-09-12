import React from "react";
import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { useHistory, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        as="h2"
        size="xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text"
      >
        Oops!
      </Heading>
      <Text fontSize="lg" mt={4} mb={2}>
        Algo deu errado.
      </Text>
      <Text color={"gray.500"} mb={6}>
        Não conseguimos carregar a página solicitada. Tente novamente mais
        tarde.
      </Text>

      <Button
        colorScheme="teal"
        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
        color="white"
        variant="solid"
        onClick={handleGoHome}
      >
        Voltar para a página inicial
      </Button>
    </Box>
  );
};

export default ErrorPage;
