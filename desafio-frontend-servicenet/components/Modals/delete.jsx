import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const DeleteModal = ({ refetch, id }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    setLoading(true);
    axios
      .delete(`http://localhost/api/usuarios/remover/${id}`)
      .then(() => {
        toast({
          title: "Sucesso!",
          description: "Usuário removido com sucesso!",
          status: "success",
        });
        onClose();
        refetch();
      })
      .catch((errors) => {
        const errorsMessage = errors.response.data;
        toast({
          title: "Erro",
          description: errorsMessage.message,
          status: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Button onClick={onOpen} color={"red.600"}>
        <DeleteIcon />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Remover Usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Tem certeza que deseja remover este usuário?</ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button onClick={onSubmit} disabled={loading} color={"red.600"}>
              Sim, remover.
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DeleteModal;
