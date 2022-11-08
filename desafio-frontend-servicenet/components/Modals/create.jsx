import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const CreateModal = ({refetch}) => {
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
    setErrors({})
    axios.post("http://localhost/api/usuarios/adicionar", values).then(() => {
        toast({
          title: "Sucesso!",
          description: "Novo usuário criado com sucesso!",
          status: "success",
        });
        onClose()
        refetch()
        setValues({})
    }).catch((errors) => {
        const errorsMessage = errors.response.data
        setErrors(errorsMessage.data)
        toast({
          title: "Erro",
          description: errorsMessage.message,
          status: "error",
        });
    }).finally(()=>{
      setLoading(false);
    });
  }

  console.log(errors)

  return (
    <div>

      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} marginY={"2rem"}>
        <h1 style={{fontSize:"2rem", fontWeight:"bold"}}>Desafio ServiceNet</h1>
        <Button onClick={onOpen} size={"lg"} colorScheme={"green"} display={"flex"} gap={"0.5rem"}>
            Novo Usuário
          <AddIcon />
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Novo Usuário</ModalHeader>
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
              Criar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreateModal;
