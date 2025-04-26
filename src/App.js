import React, { useState, useEffect } from 'react';
import { Button, Layout, Typography, Input, Form, List, message } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { getUsers, addUser, deleteUser } from './api/userService'; // Importamos funciones

const { Title } = Typography;

function App(props) {
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
      fetchUsers(); // Recarga la lista
      message.success('Usuario añadido correctamente');
    } catch (error) {
      console.error('Error al añadir usuario', error);
      message.error('No se pudo añadir el usuario');
    }
  };

  const handleDeleteUser = async (name) => {
    try {
      await deleteUser(name);
      fetchUsers(); // Recarga la lista
      message.success('Usuario eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar usuario', error);
      message.error('No se pudo eliminar el usuario');
    }
  };

  return (
    <Layout style={{ padding: '20px', marginTop: '20px', backgroundColor: '#fff' }}>
      <Title level={1}>Lista de Usuarios</Title>

      {/* Formulario para añadir usuario */}
      <Form layout="inline" onFinish={handleAddUser} style={{ marginBottom: '20px' }}>
        <Form.Item>
          <Input 
            placeholder="Nuevo usuario" 
            value={newUser} 
            onChange={(e) => setNewUser(e.target.value)} 
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />} />
        </Form.Item>
      </Form>

      {/* Lista de usuarios con botón de eliminar */}
      <List
        bordered
        dataSource={users}
        renderItem={(user) => (
          <List.Item
            actions={[
              <Button 
                type="link" 
                danger 
                icon={<DeleteOutlined />} 
                onClick={() => handleDeleteUser(user)}
              />
            ]}
          >
            {user}
          </List.Item>
        )}
      />
    </Layout>
  );
}

export default App;
