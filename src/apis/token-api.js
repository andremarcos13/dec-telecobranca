export async function fetchToken(username, password) {
  // Obtém o valor de useRestTest do localStorage
  const useRestTest = localStorage.getItem("useRestTest");

  console.log("useRestTest no token", useRestTest);

  const baseUrl =
    useRestTest === "2"
      ? "http://177.74.135.204:38137/rest/"
      : "http://177.74.135.204:38137/rest/";

  const myHeaders = new Headers();
  myHeaders.append("username", username);
  myHeaders.append("password", password);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
    // mode: "no-cors",
  };

  const apiUrl = `${baseUrl}api/oauth2/v1/token?grant_type=password`;

  try {
    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching token:", error);
    throw error;
  }
}
