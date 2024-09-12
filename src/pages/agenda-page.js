import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Flex,
  Box,
  Text,
  Button,
  Icon,
  Grid,
  Divider,
} from "@chakra-ui/react";
import CalendarioComponent from "../components/calendario";
import ContatosTable from "../components/contatos-tabela-2";
import BreadCrumbLinks from "../components/breadcumber";
import { FaClock } from "react-icons/fa";
import { BsCalendarDateFill } from "react-icons/bs";
import { FaList } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { useAppContext } from "../context/AppContext";
import Header from "../components/header";
import { fetchToken } from "../apis/token-api";
import { useNavigate } from "react-router-dom";

const AgendaPage = () => {
  const [agendaData, setAgendaData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { dateGlobal, setDateGlobal } = useAppContext();
  const { userCod, setUserCod } = useAppContext();
  const { globalToken, setGlobalToken } = useAppContext();
  const { username, setUsername } = useAppContext();
  const { password, setPassword } = useAppContext();

  const navigate = useNavigate();

  console.log("username", username);

  const checkUser = () => {
    if (username === "" || password === "") {
      navigate("/error"); // Limpar selectedItem ao clicar no botão Voltar
    }
  };

  checkUser();

  const formattedTime = currentTime.toLocaleTimeString();

  useEffect(() => {
    const fetchData = async () => {
      console.log("entrou aqui");

      // Obtém o valor de useRestTest do localStorage
      const useRestTest = localStorage.getItem("useRestTest");

      // Determina a URL base com base no valor de useRestTest
      const baseUrl =
        useRestTest === "2"
          ? "http://177.74.135.204:38137/rest/"
          : "http://177.74.135.204:38137/rest/";

      setIsLoading(true);
      let formattedDateToUse = ""; // Definir formattedDateToUse fora do bloco try-catch

      try {
        console.log("tentou aqui");

        if (dateGlobal) {
          formattedDateToUse = format(dateGlobal, "yyyyMMdd");
        } else {
          formattedDateToUse = format(selectedDate, "yyyyMMdd");
        }
        console.log("chama api");

        const response = await axios.get(`${baseUrl}agenda/operador`, {
          params: {
            data_inicial: formattedDateToUse,
            usuario: userCod,
            empresa: "01",
            filial: "01",
          },
          headers: {
            Authorization: `Bearer ${globalToken.access_token}`,
          },
        });
        setAgendaData(response.data);
        console.log("api", response.data);
        setError(null);
      } catch (error) {
        console.log("deu erro");

        console.error(error);

        if (error.response && error.response.status === 401) {
          // Erro de autorização, tentar obter um novo token
          console.log("Tentando obter novo token...");
          try {
            const newToken = await fetchToken(username, password);
            // Refazer a chamada à API principal com o novo token de acesso
            const response = await axios.get(
              `http://177.74.135.204:38137/rest/agenda/operador`,
              {
                params: {
                  data_inicial: formattedDateToUse,
                  usuario: userCod,
                  empresa: "01",
                  filial: "01",
                },
                headers: {
                  Authorization: `Bearer ${newToken.access_token}`,
                },
              }
            );
            setAgendaData(response.data);
            console.log("api", response.data);
            setError(null);
          } catch (error) {
            console.error("Erro ao obter novo token de acesso:", error);
            setError(
              "Erro ao buscar dados da API. Por favor, tente novamente mais tarde."
            );
          }
        } else {
          setError(
            "Erro ao buscar dados da API. Por favor, tente novamente mais tarde."
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    console.log("agendaData", agendaData);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, [
    selectedDate,
    dateGlobal,
    userCod,
    globalToken,
    username,
    password,
    fetchToken,
  ]); // Certifique-se de incluir todas as dependências

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedItem(null); // Limpar selectedItem ao alterar a data
  };

  const handleBackButtonClick = () => {
    setSelectedItem(null); // Limpar selectedItem ao clicar no botão Voltar
  };

  const calcularPotencialLubTotal = (listaContatos) => {
    return listaContatos.reduce(
      (total, contato) => total + contato.potencialLub,
      0
    );
  };

  const dia = selectedDate.getDate();
  const mes = selectedDate.getMonth() + 1; // Os meses são indexados a partir de zero, então adicionamos 1
  const ano = selectedDate.getFullYear();

  const dataFormatada = `${dia < 10 ? "0" : ""}${dia}/${
    mes < 10 ? "0" : ""
  }${mes}/${ano}`;

  return (
    // bg="rgba(0,0,0,0.5)"
    <Box minHeight="100vh" py="0" px="0" bg="rgba(0,0,0,0.1)">
      <Header />
      <Grid templateColumns="1fr 2fr 2fr" gap="2" alignItems="center">
        <Box mt="20px" mb="20px" px="4">
          <CalendarioComponent onDateChange={handleDateChange} />
        </Box>
        <Box mb="100px" ml="15px" mt={30}>
          {/* <Icon as={FaList} boxSize={8} color="#1A202C" /> */}
          {agendaData.length > 0 ? (
            agendaData.map((data, index) => (
              <>
                <Box key={index} fontSize="lg" color="white.500" mb="2">
                  {`Código da Lista: ${data.codLista} - Código Operador: ${data.codOperad} - Ligar às: ${data.hora}`}
                </Box>
                <Divider mb={3} />
              </>
            ))
          ) : (
            <Text fontSize="2xl" color="white.500">
              Nenhum dado disponível.
            </Text>
          )}
        </Box>
      </Grid>
      {isLoading ? (
        <Flex align="center" justify="center" h="40vh">
          <Spinner size="xl" color="#1A202C" />
        </Flex>
      ) : (
        <>
          {error && (
            <Box mt="20px" mb="20px" ml="15px">
              <Text color="red.500">{error}</Text>
            </Box>
          )}
          {agendaData.length === 0 ? (
            <Box mt="20px" mb="20px" px="4">
              <Text>Não há informações disponíveis para esta data.</Text>
            </Box>
          ) : (
            <>
              {selectedItem ? (
                <Box px="4">
                  <Button
                    onClick={handleBackButtonClick}
                    mb="4"
                    colorScheme="red"
                    variant="outline"
                    bg="white"
                  >
                    Voltar
                  </Button>
                  <ContatosTable item={selectedItem} />
                </Box>
              ) : (
                <Table variant="simple">
                  <Thead bg="#822AA2">
                    <Tr>
                      <Th color="white">Código Lista</Th>
                      <Th color="white">Descrição Lista</Th>
                      <Th color="white">Data</Th>
                      <Th color="white">Quantidade de Contatos</Th>
                      <Th color="white">Potencial Lub Total</Th>
                    </Tr>
                  </Thead>
                  <Tbody bg="white" color="black">
                    {agendaData.map((item, index) => (
                      <Tr
                        key={index}
                        _hover={{
                          bg: "#F0DFF7",
                          transition: "opacity 0.1s",
                          color: "black",
                        }}
                        onClick={() => handleItemClick(item)}
                        cursor="pointer"
                      >
                        <Td>{item.codLista}</Td>

                        <Td>{item.descLista}</Td>
                        <Td>{item.data}</Td>
                        <Td>{item.lista_contatos.length}</Td>
                        <Td>
                          {calcularPotencialLubTotal(item.lista_contatos)}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              )}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default AgendaPage;
