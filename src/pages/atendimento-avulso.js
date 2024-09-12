import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState, useRef } from "react"; // Importa useRef
import fetchClientes from "../apis/clientes-api";
import {
  Box,
  Input,
  Text,
  Spinner,
  Button,
  HStack,
  Center,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Flex,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import Header from "../components/header";
import { fetchToken } from "../apis/token-api";

const AtendimentoAvulso = () => {
  const {
    username,
    password,
    token,
    globalToken,
    rowItem,
    setRowItem,
    clienteCodigo,
    setClienteCodigo,
    setGlobalToken,
    setCodClienteGlobal,
    codClienteGlobal,
  } = useAppContext();
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [remainingRecords, setRemainingRecords] = useState(0);
  const buttonRef = useRef(null); // Cria uma referência para o botão
  const [descriptionFilter, setDescriptionFilter] = useState("");
  const [nomeFilter, setNomeFilter] = useState("");
  const [municipioFilter, setMunicipioFilter] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const cancelRef = useRef();
  const [selectedCliente, setSelectedCliente] = useState(null);

  useEffect(() => {
    if (username === "" || password === "") {
      navigate("/error");
    }
  }, [username]);

  if (username === "" || password === "") {
    navigate("/error");
  }

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let data = await fetchClientes({
        search: search,
        token: globalToken.access_token,
      });

      if (data.items) {
        setClientes(data.items);
        setHasNext(data.hasNext);
        setRemainingRecords(data.remainingRecords);
      } else {
        setClientes([]);
        setHasNext(false);
        setRemainingRecords(0);
      }
    } catch (error) {
      console.error("Erro ao buscar clientes", error);

      if (error.response && error.response.status === 401) {
        // Solicitar um novo token de acesso
        try {
          console.log("Tentando obter um novo token de acesso...");
          const newToken = await fetchToken(username, password);
          setGlobalToken(newToken);

          console.log("Novo token obtido:", newToken.access_token);

          // Tentar buscar os clientes novamente com o novo token
          const data = await fetchClientes({
            search: search,
            token: newToken.access_token,
          });

          if (data.items) {
            setClientes(data.items);
            setHasNext(data.hasNext);
            setRemainingRecords(data.remainingRecords);
          } else {
            setClientes([]);
            setHasNext(false);
            setRemainingRecords(0);
          }
        } catch (tokenError) {
          console.error("Erro ao obter novo token de acesso:", tokenError);
          // Lidar com o erro ao obter o novo token de acesso
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  console.log("cliente codigo", clienteCodigo);

  const handlePesquisar = (event) => {
    event.preventDefault();
    setDescriptionFilter("");
    setNomeFilter("");
    setMunicipioFilter("");
    fetchData();
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      buttonRef.current.click(); // Simula o clique no botão ao pressionar Enter
    }
  };

  const handleRowClick = (cliente) => {
    setSelectedCliente(cliente);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    if (selectedCliente !== null) {
      setRowItem(selectedCliente);
      setCodClienteGlobal(selectedCliente.codgrupovenda);
      console.log("Cliente selecionado:", selectedCliente.codgrupovenda);
      setClienteCodigo(selectedCliente.codigo);
      console.log("Cliente selecionado: codigo", clienteCodigo);
      const clienteIndex = clientes.indexOf(selectedCliente);
    }

    sessionStorage.setItem("codcg", codClienteGlobal);

    navigate(`/atendimento-1`); // Navega para a rota dinâmica
    setIsModalOpen(false);
  };

  const filteredResults = clientes.filter(
    (item) =>
      item.codigo.toLowerCase().includes(descriptionFilter.toLowerCase()) &&
      item.nome.toLowerCase().includes(nomeFilter.toLowerCase()) &&
      item.municipio.toLowerCase().includes(municipioFilter.toLowerCase())
  );

  return (
    <Box bg="gray.100" h="100vh">
      <Header />
      <Box>
        <Box mt={8} ml={5}>
          <form onSubmit={handlePesquisar}>
            {" "}
            {/* Formulário envolvendo o conteúdo */}
            <HStack spacing={4}>
              <Input
                placeholder="Digite o nome do cliente"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                w={350}
                mr={3}
                onKeyDown={handleEnterPress}
                bg="white"
                focusBorderColor="#822AA2"
              />
              <Button
                ref={buttonRef}
                leftIcon={<FaSearch />}
                color="#822AA2"
                borderColor="#822AA2"
                _hover={{ bg: "#F0DFF7" }}
                variant="outline"
                bg="white"
                onClick={handlePesquisar}
              >
                Procurar Cliente
              </Button>{" "}
            </HStack>
          </form>
          {hasNext !== undefined && remainingRecords !== undefined && (
            <Text mt={2}>
              {hasNext
                ? `Mais resultados disponíveis (${remainingRecords} restantes)`
                : ""}
            </Text>
          )}
        </Box>
        <Box mt={4}>
          {isLoading ? (
            <Center mt="15%">
              <Spinner size="xl" color="#1A202C" />
            </Center>
          ) : (
            <Box>
              {clientes.length > 0 ? (
                <Table colorScheme="purple" bg="white">
                  <Thead bg="#822AA2">
                    <Tr>
                      <Th color="white">
                        {" "}
                        <Flex direction="column">
                          <span>Código</span>
                          <Input
                            focusBorderColor="purple.200"
                            maxW="120px"
                            bg="white"
                            color="black"
                            placeholder="Filtrar"
                            size="sm"
                            value={descriptionFilter}
                            onChange={(e) =>
                              setDescriptionFilter(e.target.value)
                            }
                            mt={2}
                          />
                        </Flex>
                      </Th>
                      <Th color="white">Loja</Th>

                      <Th color="white">
                        {" "}
                        <Flex direction="column">
                          <span>Nome</span>
                          <Input
                            focusBorderColor="purple.200"
                            maxW="120px"
                            bg="white"
                            color="black"
                            placeholder="Filtrar"
                            size="sm"
                            value={nomeFilter}
                            onChange={(e) => setNomeFilter(e.target.value)}
                            mt={2}
                          />
                        </Flex>
                      </Th>
                      <Th color="white">Nome Fantasia</Th>
                      <Th color="white">Endereço</Th>
                      <Th color="white">Estado</Th>
                      <Th color="white">
                        {" "}
                        <Flex direction="column">
                          <span>Município</span>
                          <Input
                            focusBorderColor="purple.200"
                            maxW="120px"
                            bg="white"
                            color="black"
                            placeholder="Filtrar"
                            size="sm"
                            value={municipioFilter}
                            onChange={(e) => setMunicipioFilter(e.target.value)}
                            mt={2}
                          />
                        </Flex>
                      </Th>
                      {/* <Th color="white">Código Transportadora</Th>
                      <Th color="white">Código Grupo Venda</Th> */}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filteredResults.length > 0 ? (
                      filteredResults.map((cliente, index) => (
                        <Tr
                          key={index}
                          onClick={() => handleRowClick(cliente)}
                          style={{ cursor: "pointer" }}
                          _hover={{
                            boxShadow: "lg",
                            borderColor: "black",
                            bg: "#F0DFF7",
                            color: "black",
                          }}
                        >
                          <Td>{cliente.codigo}</Td>
                          <Td>{cliente["loja  "]}</Td>
                          <Td>{cliente.nome}</Td>
                          <Td>{cliente.nomefantasia}</Td>
                          <Td>{cliente.endereco}</Td>
                          <Td>{cliente.estado}</Td>
                          <Td>{cliente.municipio}</Td>
                        </Tr>
                      ))
                    ) : (
                      <Tr>
                        <Td colSpan="8">
                          <Text align="center">Nenhum cliente encontrado</Text>
                        </Td>
                      </Tr>
                    )}
                  </Tbody>
                </Table>
              ) : (
                <Center mt="20%">
                  <Text fontSize="xl">
                    Nenhum cliente com este nome encontrado.
                  </Text>
                </Center>
              )}
            </Box>
          )}
        </Box>
      </Box>

      <AlertDialog
        isOpen={isModalOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsModalOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirmação
            </AlertDialogHeader>

            <AlertDialogBody>
              Deseja iniciar um lançamento para este cliente?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsModalOpen(false)}>
                Não
              </Button>
              <Button colorScheme="blue" onClick={handleConfirm} ml={3}>
                Sim
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default AtendimentoAvulso;
