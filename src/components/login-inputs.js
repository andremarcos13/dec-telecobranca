import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Alert,
  AlertIcon,
  Box,
  Fade,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { fetchToken } from "../apis/token-api";
import { BeatLoader } from "react-spinners";
import { MdEmail, MdLock } from "react-icons/md";
import { FaUser } from "react-icons/fa";

function LoginComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const { username, setUsername } = useAppContext();
  const { password, setPassword } = useAppContext();
  const { globalToken, setGlobalToken } = useAppContext();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Evita o envio padrão do formulário

    setIsLoading(true);

    if (!username.trim() || !password.trim()) {
      setError("Por favor, preencha todos os campos.");
      setIsErrorVisible(true);
      setIsLoading(false);
      return;
    }

    try {
      const token = await fetchToken(username, password);

      setGlobalToken(token);

      if (token && token.access_token) {
        setIsLoading(false);
        navigate("/home");
      } else {
        setError(
          "Credenciais inválidas. Por favor, verifique seu usuário e senha."
        );
        setIsErrorVisible(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setIsLoading(false);
      setError(
        "Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde."
      );
      setIsErrorVisible(true);
    }
  };

  return (
    <Box as="form" onSubmit={handleLogin}>
      <Stack spacing={3} maxW="400px" mx="auto" mt="25">
        <FormControl id="email">
          <FormLabel htmlFor="email" display="flex" alignItems="center">
            <Box as={FaUser} color="gray.400" mr="2" />
            Usuário
          </FormLabel>
          <Input
            focusBorderColor="purple.700"
            type="text"
            id="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ex: JOÃO CARLOS"
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel htmlFor="password" display="flex" alignItems="center">
            <Box as={MdLock} color="gray.400" mr="2" />
            Senha
          </FormLabel>
          <Input
            focusBorderColor="purple.700"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
          />
        </FormControl>
        <Button
          color="white"
          bg="#2C0E37"
          type="submit" // Adiciona o tipo de botão como 'submit'
          mt={5}
          isLoading={isLoading}
          spinner={<BeatLoader size={8} color="white" />}
          _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
        >
          Entrar
        </Button>
      </Stack>
      <Fade in={isErrorVisible}>
        <Alert
          status="error"
          mt="15px"
          borderRadius="9px"
          width="405px"
          transition="opacity 0.3s ease"
        >
          <AlertIcon />
          {error}
        </Alert>
      </Fade>
    </Box>
  );
}

export default LoginComponent;
