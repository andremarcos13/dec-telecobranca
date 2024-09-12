import { Box, Flex, Heading, HStack, Image, Tooltip } from "@chakra-ui/react";
import LoginComponent from "../components/login-inputs";
import { CiUnlock } from "react-icons/ci";
import imagelogo from "../images/trr_cenze_comrcio_de_combustveis_e_derivados_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import NexusLogo from "../images/logo_nexus_consult.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const { useRestTest, setUseRestTest } = useAppContext();

  console.log("userRestTest", useRestTest);

  return (
    <Flex
      minHeight="100vh"
      bgGradient="linear(to-r, #2C0E37, #8A2387)"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg="white"
        p="5"
        h="500px"
        borderRadius="lg"
        // Adiciona uma animação na sombra
        animation="shadowAnimate 2s infinite alternate"
        textAlign="center"
      >
        <style>
          {`
            @keyframes shadowAnimate {
              30% {
                box-shadow: 0 0 10px rgba(106, 90, 205, 0.5);
              }
              100% {
                box-shadow: 0 0 25px rgba(180, 180, 180, 0.8);
              }
            }
          `}
        </style>

        <HStack spacing={2}>
          <Tooltip label="NEXUS CONSULTORIA" fontSize="md" placement="top">
            <Link
              href="https://www.nexusconsultoriams.com.br/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={NexusLogo}
                alt="João Carlos"
                borderRadius="full"
                boxSize="175px"
                style={{ objectFit: "contain" }}
                _hover={{ cursor: "pointer" }}
              />
            </Link>
          </Tooltip>
          <Image
            src={imagelogo}
            alt="Dellas Logo"
            maxW="230px" // Defina o tamanho máximo da imagem
            maxH="230px"
            mb="2" // Adiciona margem na parte inferior da imagem
            mx="auto" // Centraliza a imagem horizontalmente
            onClick={() => navigate("/admin")}
          />
        </HStack>
        {/* <Heading as="h1" size="lg" color="gray.800">
          Bem-vindo!
        </Heading> */}
        <LoginComponent />
      </Box>
    </Flex>
  );
};

export default LoginPage;
