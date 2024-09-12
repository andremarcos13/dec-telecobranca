import axios from "axios";
import { format, subDays } from "date-fns";

const today = format(new Date(), "dd/MM/yyyy");
const ninetyDaysAgo = format(subDays(new Date(), 90), "dd/MM/yyyy");

const fetchHistoricoProdutos = async (
  clienteHistPedidos,
  dataInicial,
  dataFinal,
  token,
  codLoja
) => {
  const useRestTest = localStorage.getItem("useRestTest");

  const baseUrl =
    useRestTest === "2"
      ? "http://177.74.135.204:38137/rest/"
      : "http://177.74.135.204:38137/rest/";

  try {
    const response = await axios.get(`${baseUrl}HISTORICO_PEDIDOS`, {
      params: {
        loja: codLoja,
        dt_inicial: dataInicial,
        dt_final: dataFinal,
        cliente: clienteHistPedidos,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar histórico de produtos:", error);
    throw error;
  }
};

export default fetchHistoricoProdutos;
