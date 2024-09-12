import axios from "axios";

const fetchClientes = async ({
  search = "",
  page = 1,
  pageSize = 5000,
  token,
}) => {
  // Determina a URL base com base no valor de useRestTest
  const useRestTest = localStorage.getItem("useRestTest");

  const baseUrl =
    useRestTest === "2"
      ? "http://177.74.135.204:38137/rest/"
      : "http://177.74.135.204:38137/rest/";

  // URL completa para a requisição
  const apiUrl = `${baseUrl}api/v1/clientes`;

  try {
    const response = await axios.get(apiUrl, {
      params: {
        empresa: "01",
        filial: "01",
        search: search,
        page: page,
        pagesize: pageSize,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
};

export default fetchClientes;
