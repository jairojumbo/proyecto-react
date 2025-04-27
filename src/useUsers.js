import { useState, useEffect } from 'react';
import { getUsers, addUser, deleteUser, updateUser } from './api/userService';

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false); // 👈 Nuevo estado de loading

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error al cargar usuarios', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (showAlert) => {
    if (newUser.trim() === '') return;

    const userAlreadyExists = users.some(user => user.toLowerCase() === newUser.trim().toLowerCase());

    if (!editingUser && userAlreadyExists) {
      showAlert('Este usuario ya existe', 'warning');
      return;
    }

    if (editingUser) {
      if (newUser.trim().toLowerCase() !== editingUser.toLowerCase() && userAlreadyExists) {
        showAlert('Ya existe otro usuario con ese nombre', 'warning');
        return;
      }
    }

    try {
      if (editingUser) {
        await updateUser(editingUser, newUser.trim());
        showAlert('Usuario actualizado correctamente', 'success');
        setEditingUser(null);
      } else {
        await addUser(newUser.trim());
        showAlert('Usuario añadido correctamente', 'success');
      }
      setNewUser('');
      fetchUsers();
    } catch (error) {
      console.error('Error en la operación', error);
      showAlert('No se pudo completar la operación', 'error');
    }
  };

  const handleDeleteUser = async (name, showAlert) => {
    try {
      await deleteUser(name);
      fetchUsers();
      showAlert('Usuario eliminado correctamente', 'success');
    } catch (error) {
      console.error('Error al eliminar usuario', error);
      showAlert('No se pudo eliminar el usuario', 'error');
    }
  };

  const handleEditUser = (name) => {
    setEditingUser(name);
    setNewUser(name);
  };

  return {
    users,
    newUser,
    setNewUser,
    handleAddUser,
    handleDeleteUser,
    handleEditUser,
    editingUser,
    loading,
  };
}
