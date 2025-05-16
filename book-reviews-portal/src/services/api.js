import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const getRegistros = async () => {
  try {
    const response = await api.get('/book-reviews/list');
    return response;
  } catch (error) {
    console.error('Error al obtener registros:', error);
    throw error;
  }
};

export const getRegistrosPorCategoria = async (categoria) => {
  try {
    const response = await api.get(`/book-reviews/categoria/${categoria}`);
    return response;
  } catch (error) {
    console.error('Error al obtener registros por categoría:', error);
    throw error;
  }
};

export const createRegistro = async (registro) => {
  try {
    const response = await api.post('/book-reviews/create', registro);
    return response;
  } catch (error) {
    console.error('Error al crear el registro:', error);
    throw error;
  }
};
