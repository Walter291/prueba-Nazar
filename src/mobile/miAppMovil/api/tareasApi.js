import axios from 'axios';
import { API_URL } from '../constants/config';

export const getTareas = async () => {
  const res = await axios.get(`${API_URL}Tareas`);
  return res.data;
};

export const completarTarea = async (id) => {
  try {
    const res = await axios.put(`${API_URL}Tareas/${id}/completar`);
    return res.status === 200;
  } catch {
    return false;
  }
};

export const getTareasFiltradas = async (estado) => {
  const res = await axios.get(`${API_URL}Tareas/filtrar?estado=${estado}`);
  return res.data;
};
