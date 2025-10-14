import axios from "axios";
import { API_URL } from "../constants/config";

const instance = axios.create({
  baseURL: API_URL, 
});

export const getTareas = async () => {
  const res = await instance.get("Tareas");
  return res.data;
};

export const completarTarea = async (id) => {
  try {
    const res = await instance.put(`Tareas/${id}/completar`);
    return res.status === 200;
  } catch {
    return false;
  }
};

export const getTareasFiltradas = async (estado) => {
  const res = await instance.get(`Tareas/filtrar?estado=${estado}`);
  return res.data;
};
