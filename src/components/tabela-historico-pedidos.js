import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const PedidoTable = ({ pedidos }) => {
  // Função para converter a data no formato "DD/MM/YYYY" para um objeto Date
  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split("/");
    return new Date(`${year}-${month}-${day}`);
  };

  // Ordenar os pedidos pela data de emissão (do mais recente para o mais antigo)
  const pedidosOrdenados = [...pedidos].sort(
    (a, b) => parseDate(b.emissao) - parseDate(a.emissao)
  );

  return (
    <Table variant="striped" colorScheme="purple">
      <Thead>
        <Tr bg="#822AA2">
          <Th color="white">Tipo</Th>
          <Th color="white">Número</Th>
          <Th color="white">Emissão</Th>
          <Th color="white">Prazo</Th>
          <Th color="white">Status</Th>
          <Th color="white">Valor</Th>
          <Th color="white">Cond. Pagamento</Th>
          <Th color="white">Produtos</Th>
          <Th color="white">Qtd Total</Th>
          <Th color="white">Valor Unitário</Th>
          <Th color="white">Volume</Th>
        </Tr>
      </Thead>
      <Tbody>
        {pedidosOrdenados.length > 0 ? (
          pedidosOrdenados.map((pedido, index) => {
            const descricaoProdutos = pedido.itens
              .map((item) => item.descricao_produto)
              .join(", ");
            const qtdTotalProdutos = pedido.itens
              .map((item) => item.qtde_produto)
              .reduce((acc, qtd) => acc + qtd, 0);
            const precoUnitarioProdutos = pedido.itens
              .map((item) => `R$ ${item.preco_unitario.toFixed(2)}`)
              .join(", ");
            const volumeProdutos = pedido.itens
              .map((item) => item.volume_produto)
              .reduce((acc, volume) => acc + volume, 0);

            return (
              <Tr key={index}>
                <Td>{pedido.tipo}</Td>
                <Td>{pedido.numero}</Td>
                <Td>{pedido.emissao}</Td>
                <Td>{pedido.prazo_medio}</Td>
                <Td>{pedido.status}</Td>
                <Td>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(pedido.valor)}
                </Td>
                <Td>{pedido.cond_pgto}</Td>
                <Td>{descricaoProdutos}</Td>
                <Td>{qtdTotalProdutos}</Td>
                <Td>{precoUnitarioProdutos}</Td>
                <Td>{volumeProdutos}</Td>
              </Tr>
            );
          })
        ) : (
          <Tr>
            <Td colSpan={11} textAlign="center">
              Não foram encontrados pedidos.
            </Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  );
};

export default PedidoTable;
