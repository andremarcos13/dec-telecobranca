import axios from "axios";

const enviarRequisicao = async (requestBody, token) => {
  const useRestTest = localStorage.getItem("useRestTest");

  const baseUrl =
    useRestTest === "2"
      ? "http://177.74.135.204:38137/rest/"
      : "http://177.74.135.204:38137/rest/";

  try {
    const response = await axios.post(
      `${baseUrl}atendimento?empresa=01&filial=01`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar requisição:", error);
    throw error;
  }
};

export default enviarRequisicao;
