import React, { createContext, useContext, useState } from "react";

// Criando o contexto
const AppContext = createContext();

// Componente Provider que irá envolver os componentes que precisam acessar o contexto
const AppContextProvider = ({ children }) => {
  const [dateGlobal, setDateGlobal] = useState("");
  const [rowItem, setRowItem] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [globalToken, setGlobalToken] = useState("");
  const [userCod, setUserCod] = useState(null);
  const [useRestTest, setUseRestTest] = useState("1");
  const [clienteCodigo, setClienteCodigo] = useState("");
  const [codClienteGlobal, setCodClienteGlobal] = useState("");

  return (
    <AppContext.Provider
      value={{
        codClienteGlobal,
        setCodClienteGlobal,
        clienteCodigo,
        setClienteCodigo,
        useRestTest,
        setUseRestTest,
        userCod,
        setUserCod,
        globalToken,
        setGlobalToken,
        dateGlobal,
        setDateGlobal,
        rowItem,
        setRowItem,
        username,
        setUsername,
        password,
        setPassword,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext deve ser usado dentro do AppProvider");
  }
  return context;
}

export default AppContextProvider;
