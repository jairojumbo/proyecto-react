import axios from 'axios';

const API_URL = 'https://api-react-1.itielsoluciones.com/users'; // URL del backend

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // Esto solo es útil si el servidor responde bien
  },
  withCredentials: false, // Pon 'true' si necesitas enviar cookies o credenciales
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
