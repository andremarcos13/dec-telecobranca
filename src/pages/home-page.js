import {
  VStack,
  Button,
  Icon,
  SimpleGrid,
  Box,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { MdEvent } from "react-icons/md";
import UserDataHome from "../components/user-data-home";
import { useNavigate } from "react-router-dom";
import { RiCustomerService2Fill } from "react-icons/ri";
import { useAppContext } from "../context/AppContext";
import fetchCodUser from "../apis/cod-user-api";
import { useEffect, useState } from "react";
import { fetchToken } from "../apis/token-api";
import Header from "../components/header";
import fetchTransportadoras from "../apis/transportadoras-api";
import fetchCondPagamentos from "../apis/cond-pagamento";
import fetchOperadores from "../apis/operadores-api";
import fetchVendedores from "../apis/vendedores-api";

const HomePage = () => {
  const [userData, setUserData] = useState(null);
  const { username } = useAppContext();
  const { userCod, setUserCod } = useAppContext();
  const { globalToken, setGlobalToken } = useAppContext();
  const { password } = useAppContext();
  const [userFound, setUserFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log("username home", username);

  console.log("userCod", userCod);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        // if (!userCod) {
        //   const response = await fetchCodUser(globalToken.access_token);
        //   const { items } = response;
        //   const user = items.find((item) => item.u7_nome.includes(username));
        //   if (user) {
        //     setUserData(user);
        //     setUserCod(user.u7_codusu);
        //     setUserFound(true);
        //   }
        // } else {
        //   setUserFound(true);
        // }

        const storedTransportadoras = sessionStorage.getItem("transportadoras");
        const storedCondPagamentos = sessionStorage.getItem("condPagamentos");
        const storedOperadores = sessionStorage.getItem("operadores");
        const storedVendedores = sessionStorage.getItem("vendedores");

        if (
          !storedTransportadoras ||
          !storedCondPagamentos ||
          !storedOperadores ||
          !storedVendedores
        ) {
          console.log("Fetching additional data...");

          const response_trans = await fetchTransportadoras(
            globalToken.access_token
          );
          console.log("Transportadoras fetched:", response_trans);

          const response_cond = await fetchCondPagamentos(
            globalToken.access_token
          );
          console.log("Condições de Pagamento fetched:", response_cond);

          const response_operadores = await fetchOperadores({
            empresa: "01",
            filial: "01",
            token: globalToken.access_token,
          });
          console.log("Operadores fetched:", response_operadores);

          const response_vendedores = await fetchVendedores({
            empresa: "01",
            filial: "01",
            token: globalToken.access_token,
          });
          console.log("Vendedores fetched:", response_vendedores);

          sessionStorage.setItem(
            "vendedores",
            JSON.stringify(response_vendedores.items)
          );
          sessionStorage.setItem(
            "operadores",
            JSON.stringify(response_operadores.items)
          );
          sessionStorage.setItem(
            "transportadoras",
            JSON.stringify(response_trans.items)
          );
          sessionStorage.setItem(
            "condPagamentos",
            JSON.stringify(response_cond.items)
          );
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        try {
          console.log("Fetching new token...");
          const newToken = await fetchToken(username, password);
          setGlobalToken(newToken);
          console.log("New token obtained:", newToken);

          const newResponse = await fetchCodUser(newToken.access_token, 1);
          console.log("New user data fetched:", newResponse);

          const { items } = newResponse;
          const user = items.find((item) => item.u7_nome.includes(username));
          if (user) {
            setUserData(user);
            setUserCod(user.u7_codusu);
            setUserFound(true);
          }
        } catch (tokenError) {
          console.error("Erro ao obter novo token:", tokenError);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [globalToken, password, setGlobalToken, setUserCod, username, userCod]);

  const navigate = useNavigate();

  if (username === "" || password === "") {
    navigate("/error");
  }

  const handleRoute = () => {
    navigate("/agenda");
  };

  const handleRoute3 = () => {
    navigate("/atendimento");
  };

  return (
    <Box minHeight="100vh" py="0" px="0" bg="rgba(0,0,0,0.1)">
      <Box>
        <Header />
        <UserDataHome />
      </Box>
      {isLoading ? (
        <Center mt="15%">
          <Spinner size="xl" color="#1A202C" />
        </Center>
      ) : (
        <VStack spacing="6" h="50vh" justifyContent="center">
          <SimpleGrid columns={[1, 2, 4]} spacingX="8" spacingY="6">
            {/* <Button
              size="lg"
              width="200px"
              height="200px"
              borderRadius="20px"
              colorScheme="gray"
              fontSize="lg"
              padding="4"
              boxShadow="md"
              _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
              leftIcon={<Icon as={MdEvent} boxSize={8} />}
              onClick={handleRoute}
            >
              AGENDA
            </Button> */}
            <Button
              size="lg"
              width="200px"
              height="200px"
              borderRadius="20px"
              colorScheme="gray"
              fontSize="lg"
              padding="4"
              boxShadow="md"
              _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
              leftIcon={<Icon as={RiCustomerService2Fill} boxSize={8} />}
              onClick={handleRoute3}
            >
              REALIZAR
              <br /> ATENDIMENTO
            </Button>
          </SimpleGrid>
        </VStack>
      )}
    </Box>
  );
};

export default HomePage;
