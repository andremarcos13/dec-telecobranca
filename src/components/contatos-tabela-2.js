import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { MdDone } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { GrHide } from "react-icons/gr";

const ContatosTabela2 = ({ item, onBackButtonClick }) => {
  const [showNextContact, setShowNextContact] = useState(false);
  const [hiddenRows, setHiddenRows] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const { rowItem, setRowItem, setCodClienteGlobal, codClienteGlobal } =
    useAppContext();

  const navigate = useNavigate();

  const capitalizeFirstLetter = (str) => {
    return str.toLowerCase().replace(/(?:^|\s)\w/g, (match) => {
      return match.toUpperCase();
    });
  };

  const hideRow = (index) => {
    setHiddenRows([...hiddenRows, index]);
  };

  const isRowHidden = (index) => {
    return hiddenRows.includes(index);
  };

  const handleRowClick = (index, event) => {
    // Verifica se o ícone de OK foi clicado, se sim, não faz nada
    if (event.target.tagName !== "BUTTON") {
      // Se o clique não foi no botão, abre o modal
      setSelectedItem(item.lista_contatos[index]);
      setRowItem(item.lista_contatos[index]);
      setCodClienteGlobal(item.lista_contatos[index].codGrupoVenda);
      console.log("rowItem", item.lista_contatos[index].codGrupoVenda);
      console.log("rowItem", rowItem);
      console.log("selectedRowItem", selectedItem);
      setShowNextContact(true);
      navigate(`/atendimento/${[index]}`);
    }
    sessionStorage.setItem("codcg", JSON.stringify(codClienteGlobal));
  };

  return (
    <>
      <Flex justifyContent="center" maxWidth="100%" overflowX="auto">
        <Table variant="simple" style={{ overflowX: "auto" }}>
          <Thead position="sticky" top="0" bg="#822AA2" fontWeight="bold">
            <Tr>
              <Th color="white">Nome Cliente</Th>
              <Th color="white">Nome Contato</Th>
              <Th color="white">Tel. Contato</Th>
              <Th color="white">Data Cadastro</Th>
              <Th color="white">Última Compra</Th>
              <Th color="white">Email Cliente</Th>
              <Th color="white">Município</Th>
              <Th color="white">Observação Cliente</Th>
              <Th color="white">Potencial Lub</Th>
              <Th color="white">Venda Total NFS</Th>
              <Th color="white">{""}</Th>{" "}
              {/* Coluna extra para o ícone de OK */}
            </Tr>
          </Thead>
          <Tbody bg="white">
            {item.lista_contatos.map(
              (contato, index) =>
                !isRowHidden(index) && ( // Verifica se a linha deve ser exibida
                  <Tr
                    key={index}
                    _hover={{
                      bg: "#F0DFF7",
                      transition: "opacity 0.1s",
                      transform: "scale(1.02)",
                      boxShadow: "lg",
                      color: "black",
                    }}
                    onClick={(event) => handleRowClick(index, event)} // Adiciona o evento de clique na linha
                    cursor="pointer"
                  >
                    <Td>{capitalizeFirstLetter(contato.nomeCliente)}</Td>
                    <Td>{capitalizeFirstLetter(contato.nomeContato)}</Td>

                    <Td>{contato.celular}</Td>
                    <Td>{contato.dataCadastro}</Td>
                    {/* <Td>{`${contato.diasCompras} dias`}</Td> */}
                    <Td
                      fontSize="sm"
                      fontWeight="bold"
                      bg={
                        contato.diasCompras <= 90
                          ? "green.400"
                          : contato.diasCompras <= 180
                          ? "yellow.300"
                          : "red.400"
                      }
                      color={
                        contato.diasCompras <= 90
                          ? "white"
                          : contato.diasCompras <= 180
                          ? "black"
                          : "white"
                      }
                      w="99px"
                      borderRadius="10px"
                      justifyContent="center"
                      p={3}
                      textAlign="center" // Centraliza horizontalmente o texto
                    >
                      {`${contato.diasCompras} ${
                        contato.diasCompras > 1 ? "dias" : "dia"
                      }`}
                    </Td>
                    <Td w={120}>{contato.emailCliente.toLowerCase()}</Td>
                    <Td w={200}>{capitalizeFirstLetter(contato.municipio)}</Td>
                    <Td>{capitalizeFirstLetter(contato.obsCliente)}</Td>
                    <Td>{contato.potencialLub}</Td>
                    <Td>{contato.venda_total_nfs}</Td>
                    <Td>
                      <Button
                        onClick={(event) => {
                          event.stopPropagation(); // Impede a propagação do clique para a linha
                          hideRow(index);
                        }}
                        bg="#2C0E37"
                        variant="outline"
                        _hover={{
                          transform: "scale(1.05)",
                          boxShadow: "lg",
                          bg: "red.300",
                        }}
                      >
                        <Icon as={GrHide} boxSize={5} color="white" />
                      </Button>
                    </Td>
                  </Tr>
                )
            )}
          </Tbody>
        </Table>
      </Flex>
    </>
  );
};

export default ContatosTabela2;
