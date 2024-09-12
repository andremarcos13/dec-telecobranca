import {
  Flex,
  Box,
  Heading,
  Spacer,
  Link,
  Tooltip,
  Image,
  HStack,
} from "@chakra-ui/react";
import { useAppContext } from "../context/AppContext";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { FaHeadphones } from "react-icons/fa";
import NexusLogo from "../images/logo_nexus_consult.png";

function Header() {
  const { username } = useAppContext();
  const navigate = useNavigate();

  const useRestTest = localStorage.getItem("useRestTest");

  const headerBgColor = useRestTest === "2" ? "red.500" : "#2C0E37";
  const headerText = useRestTest === "2" ? "Cenze - ambiente test" : "Cenze";

  const handleStartAtendimento = () => {
    navigate("/atendimento");
  };

  return (
    <Flex
      p="5"
      bg={headerBgColor}
      color="white"
      alignItems="center"
      position="relative"
      h="60px"
    >
      <Tooltip label="NEXUS CONSULTORIA" fontSize="md" placement="top">
        <Link
          href="https://www.nexusconsultoriams.com.br/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={NexusLogo}
            alt="João Carlos"
            borderRadius="full"
            boxSize="115px"
            style={{ objectFit: "contain" }}
            _hover={{ cursor: "pointer" }}
          />
        </Link>
      </Tooltip>

      <Spacer />
      <Box
        position="absolute"
        left="50%"
        transform="translateX(-50%)"
        display="flex"
        alignItems="center"
      >
        <Box position="relative" display="flex" alignItems="center" p={3}>
          <Link
            ml="4"
            onClick={handleStartAtendimento}
            style={{ cursor: "pointer" }}
          >
            Iniciar Atendimento
          </Link>
          <Box ml="4">
            <FaHeadphones size="24px" />
          </Box>
        </Box>
      </Box>
      <Box>
        <Box position="relative" display="flex" alignItems="center" p={3}>
          <RouterLink to="/home" style={{ marginRight: "16px" }}>
            <Heading size="md">{headerText}</Heading>
          </RouterLink>
        </Box>
        {/* <RouterLink to="/home" style={{ marginRight: "16px" }}>
            Página Inicial
          </RouterLink> */}
      </Box>
    </Flex>
  );
}

export default Header;
