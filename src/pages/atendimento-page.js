import { Box, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import ptLocale from "date-fns/locale/pt-BR";
import { useEffect } from "react";
import fetchAgenda from "../apis/agenda-api";
import Atendimento from "../components/atendimento";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const AtendimentoPage = () => {
  const { username, password } = useAppContext();
  const navigate = useNavigate();

  if (username === "" || password === "") {
    navigate("/error"); // Limpar selectedItem ao clicar no botão Voltar
  }

  return (
    <Box>
      <Atendimento />
    </Box>
  );
};

export default AtendimentoPage;
