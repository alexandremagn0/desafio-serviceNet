import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";

const CreateModal = () => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [values, setValues] = useState();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState();

  const onChange = (event) => {
    const {value, name} = event.target
    setValues({...values, [name]: value})
  }

  const onSubmit = () => {
    setLoading(true)
    axios.post("http://localhost/api/usuarios/adicionar", values).then(() => {
        toast({
          title: "Sucesso!",
          description: "Novo usuário criado com sucesso!",
          status: "success",
        });
    }).catch((errors) => {
        setErrors(errors.response.data)
        toast({
          title: "Erro",
          description: "Falha ao criar usuário!",
          status: "error",
        });
    });
  }

  return (
    <div>
      <Button onClick={onOpen}>Novo Usuário</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Novo Usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input
                type="text"
                onChange={onChange}
                name="name"
                value={values?.name}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Data de Nascimento</FormLabel>
              <Input
                type="date"
                onChange={onChange}
                name="birth_date"
                value={values?.birth_date}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                onChange={onChange}
                name="email"
                value={values?.email}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Senha</FormLabel>
              <Input
                type="password"
                onChange={onChange}
                name="password"
                value={values?.password}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button variant="ghost" onClick={onSubmit}>
              Criar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreateModal;
