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
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

const EditModal = ({ refetch, id }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [values, setValues] = useState();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();

  useEffect(() => {
    isOpen && axios.get(`http://localhost/api/usuarios/${id}`).then((response) => {
      setValues(response.data.data);
    });

  }, [isOpen, id]);

  const onChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = () => {
    setLoading(true);
    setErrors({});
    axios
      .put(`http://localhost/api/usuarios/atualizar/${id}`, values)
      .then(() => {
        toast({
          title: "Sucesso!",
          description: "Usuário atualizado criado com sucesso!",
          status: "success",
        });
        onClose();
        refetch();
        setValues({});
      })
      .catch((errors) => {
        const errorsMessage = errors.response.data;
        setErrors(errorsMessage.data);
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

  console.log(errors);

  return (
    <div>
      <Button onClick={onOpen} display={"flex"} gap={"0.5rem"}>
        <EditIcon />
        Atualizar
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Atualizar Usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={!!errors?.name}>
              <FormLabel>Nome</FormLabel>
              <Input
                type="text"
                onChange={onChange}
                name="name"
                value={values?.name}
              />
              <FormErrorMessage>{errors?.name}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors?.birth_date}>
              <FormLabel>Data de Nascimento</FormLabel>
              <Input
                type="date"
                onChange={onChange}
                name="birth_date"
                value={values?.birth_date}
              />
              <FormErrorMessage>{errors?.birth_date}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors?.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                onChange={onChange}
                name="email"
                value={values?.email}
              />
              <FormErrorMessage>{errors?.email}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors?.password}>
              <FormLabel>Senha</FormLabel>
              <Input
                type="password"
                onChange={onChange}
                name="password"
                value={values?.password}
              />
              <FormErrorMessage>{errors?.password}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button onClick={onSubmit} disabled={loading}>
              Atualizar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditModal;
