import React from 'react';
import { Button, Layout, Typography, Input, Form, List } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useUsers } from './useUsers'; // Importamos el nuevo hook

const { Title } = Typography;

function App() {
  
  const { users, newUser, setNewUser, handleAddUser, handleDeleteUser } = useUsers();

  return (
    <Layout style={{ padding: '20px', marginTop: '20px', backgroundColor: '#fff' }}>
      <Title level={1}>Lista de Usuarios - Usando Surge y Git Actions</Title>

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
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />} />
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />} />
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
              />,
              <Button 
                type="link" 
                danger 
                icon={<EditOutlined />} 
                onClick={() => handleDeleteUser(user)}
              />
            ]}>
            {user}
          </List.Item>
        )}
      />
    </Layout>
  );
}

export default App;
