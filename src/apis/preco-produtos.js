import axios from "axios";

const fetchTabPreco = async (codTabelaCliente, token) => {
  const useRestTest = localStorage.getItem("useRestTest");

  const baseUrl =
    useRestTest === "2"
      ? "http://177.74.135.204:38137/rest/"
      : "http://177.74.135.204:38137/rest/";
  const apiUrl = `${baseUrl}TABPRECO`;

  console.log("fetchTabPreco useRestTest:", useRestTest);
  console.log("fetchTabPreco Using URL:", apiUrl);

  try {
    const response = await axios.get(apiUrl, {
      params: {
        grupo_cli: "010",
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching tab preco:", error);
    throw error;
  }
};

export default fetchTabPreco;
