import axios from "axios";

const fetchPrecoDeVenda = async ({ loja, cliente, produto, qtd, token }) => {
  const useRestTest = localStorage.getItem("useRestTest");

  // Determina a URL base com base no valor de useRestTest
  const baseUrl =
    useRestTest === "2"
      ? "http://177.74.135.204:38137/rest/"
      : "http://177.74.135.204:38137/rest/";

  // URL completa para a requisição
  const apiUrl = `${baseUrl}api/v1/tabela_preco`;

  try {
    const response = await axios.get(apiUrl, {
      params: {
        empresa: "01",
        filial: "01",
        loja: loja,
        cliente: cliente,
        produto: produto,
        quantidade: qtd,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar preço de venda:", error);
    throw error;
  }
};

export default fetchPrecoDeVenda;
