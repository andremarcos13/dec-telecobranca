import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

const DrawerCarrinho = ({ controlaAbrir }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false); // Estado interno do Drawer

  useEffect(() => {
    setIsOpenDrawer(controlaAbrir); // Atualiza o estado interno com a prop recebida
  }, [controlaAbrir]);

  const handleClick = () => {
    setIsOpenDrawer(false); // Fecha o Drawer ao clicar no botão "Cancel"
  };

  return (
    <>
      <Box>
        <Drawer
          isOpen={isOpenDrawer}
          placement="right"
          onClose={onClose}
          trapFocus={false}
        >
          <DrawerOverlay blockScrollOnMount={false} />{" "}
          {/* Aqui está a modificação */}
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>

            <DrawerBody>
              <Input placeholder="Type here..." />
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={handleClick}>
                Cancel
              </Button>
              <Button colorScheme="blue">Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
};

export default DrawerCarrinho;
