import { useState, useEffect } from 'react';
import { message } from 'antd';
import { getUsers, addUser, deleteUser } from './api/userService';

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error al cargar usuarios', error);
      message.error('Error al cargar usuarios');
    }
  };

  const handleAddUser = async () => {
    if (newUser.trim() === '') return;

    try {
      await addUser(newUser.trim());
      setNewUser('');
      fetchUsers();
      message.success('Usuario añadido correctamente');
    } catch (error) {
      console.error('Error al añadir usuario', error);
      message.error('No se pudo añadir el usuario');
    }
  };

  const handleDeleteUser = async (name) => {
    try {
      await deleteUser(name);
      fetchUsers();
      message.success('Usuario eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar usuario', error);
      message.error('No se pudo eliminar el usuario');
    }
  };

  return {
    users,
    newUser,
    setNewUser,
    handleAddUser,
    handleDeleteUser,
  };
}
