import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import CreateModal from "../components/Modals/create";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [users, setUsers] = useState()

  const getUsers = () => {
    axios.get("http://localhost/api/usuarios").then((response) => {
      setUsers(response.data.data);
    });
  }

  useEffect(() => {
    getUsers()
  
  }, [])
    

  return (
    <div className={styles.container}>
      
    <CreateModal />
    
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Matricula</Th>
              <Th>Nome</Th>
              <Th>Email</Th>
              <Th>Nascimento</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users?.map((user) => (
              <Tr key={user.registration}>
                <Td>{user.registration}</Td>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.birth_date}</Td>
                <Td>
                  <Button>Editar</Button>
                  <Button>Excluir</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
