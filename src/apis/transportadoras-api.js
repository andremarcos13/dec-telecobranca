import axios from "axios";

const fetchTransportadoras = async (token) => {
  // Obtém o valor de useRestTest do localStorage
  const useRestTest = localStorage.getItem("useRestTest");

  // Determina a URL base com base no valor de useRestTest
  const baseUrl =
    useRestTest === "2"
      ? "http://177.74.135.204:38137/rest/"
      : "http://177.74.135.204:38137/rest/";

  try {
    const response = await axios.get(`${baseUrl}api/v1/transporadoras`, {
      params: {
        empresa: "01",
        filial: "01",
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchTransportadoras;
