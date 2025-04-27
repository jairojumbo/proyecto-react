import React, { useState } from 'react';
import { Button, Layout, Typography, Input, Form, List, Spin } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { useUsers } from './useUsers';
import { Snackbar, Alert } from '@mui/material'; // Material UI

const { Title } = Typography;

function App() {
  const { users, newUser, setNewUser, handleAddUser, handleDeleteUser, handleEditUser, editingUser, loading } = useUsers(); // 👈 agregamos loading

  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState({ message: '', severity: 'success' });

  const showAlert = (message, severity) => {
    setMessageInfo({ message, severity });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Layout style={{ padding: '20px', marginTop: '20px', backgroundColor: '#fff' }}>
      <Title level={1}>Lista de Usuarios - Usando Surge y Git Actions</Title>

      {/* Formulario para añadir o editar usuario */}
      <Form layout="inline" onFinish={() => handleAddUser(showAlert)} style={{ marginBottom: '20px' }}>
        <Form.Item>
          <Input 
            placeholder="Nuevo usuario" 
            value={newUser} 
            onChange={(e) => setNewUser(e.target.value)} 
          />
        </Form.Item>
        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            icon={editingUser ? <SaveOutlined /> : <PlusOutlined />}
          >
            {editingUser ? 'Guardar' : 'Añadir'}
          </Button>
        </Form.Item>
      </Form>

      {/* Loading mientras carga usuarios */}
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: 50 }}>
          <Spin size="large" />
        </div>
      ) : (
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
                  onClick={() => handleDeleteUser(user, showAlert)}
                />,
                <Button 
                  type="link" 
                  icon={<EditOutlined />} 
                  onClick={() => handleEditUser(user)}
                />
              ]}>
              {user}
            </List.Item>
          )}
        />
      )}

      {/* Snackbar de Material UI */}
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity={messageInfo.severity} sx={{ width: '100%' }}>
          {messageInfo.message}
        </Alert>
      </Snackbar>
    </Layout>
  );
}

export default App;
