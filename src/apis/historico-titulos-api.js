import axios from "axios";

const historicoTitulos = async (
  token,
  codigoCliente,
  loja,
  emissaoInicial,
  emissaoFinal,
  vencimentoInicial,
  vencimentoFinal,
  situacao
) => {
  const useRestTest = localStorage.getItem("useRestTest");

  // Determina a URL base com base no valor de useRestTest
  const baseUrl =
    useRestTest === "2"
      ? "http://177.74.135.204:38137/rest/"
      : "http://177.74.135.204:38137/rest/";

  // Configuração do cabeçalho com o token passado como argumento
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // Dados para a requisição
  const data = {
    codigo: codigoCliente,
    loja: loja,
    emissao_inicial: emissaoInicial,
    emissao_final: emissaoFinal,
    vencimento_inicial: vencimentoInicial,
    vencimento_final: vencimentoFinal,
    pagamento_inicial: "",
    pagamento_final: "",
    situacao: situacao,
  };

  // Tentativa de fazer a requisição
  try {
    const response = await axios.post(
      `${baseUrl}historico_titulos`,
      data,
      config
    );
    console.log(response.data);
    return response.data; // Retorna os dados da resposta
  } catch (error) {
    console.error("Erro ao fazer a requisição:", error);
    throw error; // Lança novamente o erro para que seja tratado externamente
  }
};

export default historicoTitulos;
