import axios from 'axios';

//const API_URL = 'http://localhost:4000/users';
const API_URL = 'https://api-react-1.itielsoluciones.com/users';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: false,
});

// Obtener todos los usuarios
export const getUsers = () => {
  return axiosInstance.get('');
};

// Añadir un usuario
export const addUser = (name) => {
  return axiosInstance.post('', { name });
};

// Eliminar un usuario
export const deleteUser = (name) => {
  return axiosInstance.delete(`/${name}`);
};

// Actualizar un usuario
export const updateUser = (oldName, newName) => {
  return axiosInstance.put(`/${oldName}`, { name: newName });
};