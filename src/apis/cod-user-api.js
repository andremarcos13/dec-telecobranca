import axios from "axios";

const fetchCodUser = async (token) => {
  const useRestTest = localStorage.getItem("useRestTest");

  const baseUrl =
    useRestTest === "2"
      ? "http://177.74.135.204:38137/rest/"
      : "http://177.74.135.204:38137/rest/";
  const apiUrl = `${baseUrl}api/framework/v1/genericList`;

  console.log("fetchCodUser useRestTest:", useRestTest);
  console.log("fetchCodUser Using URL:", apiUrl);

  try {
    const response = await axios.get(apiUrl, {
      params: {
        alias: "SU7",
        fields: "U7_NOME,U7_CODUSU",
        Page: 1,
        PageSize: 150,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching cod user:", error);
    throw error;
  }
};

export default fetchCodUser;
