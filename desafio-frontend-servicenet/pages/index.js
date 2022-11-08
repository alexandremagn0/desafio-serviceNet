import {
  Box,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import CreateModal from "../components/Modals/create";
import DeleteModal from "../components/Modals/delete";
import EditModal from "../components/Modals/edit";

export default function Home() {
  const [users, setUsers] = useState();
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState('');

  const getUsers = (filter) => {
    axios.get("http://localhost/api/usuarios", {params: {name: filter}}).then((response) => {
      setUsers(response.data.data);
      setMessage('')
    }).catch((error) => {
      setUsers([])
      setMessage(error.response.data.message)
    });
  };

  useEffect(() => {
    getUsers(filter);
  }, [filter]);

  const handleSearch = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <CreateModal refetch={getUsers} />

      <Input
        placeholder="Buscar usuário pelo nome..."
        onChange={handleSearch}
      />

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
                  <Box display={"flex"} gap={"1rem"}>
                    <EditModal refetch={getUsers} id={user?.id} />
                    <DeleteModal refetch={getUsers} id={user?.id} />
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <span>{message}</span>
    </div>
  );
}
