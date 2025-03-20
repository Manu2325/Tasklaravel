import axios from 'axios';

const API_URL = 'http://localhost:8000/api/tareas'; // URL de tu API en Laravel

export const getTareas = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const crearTarea = async (tarea) => {
    const response = await axios.post(API_URL, tarea);
    return response.data;
};

export const actualizarTarea = async (id, tarea) => {
    const response = await axios.put(`${API_URL}/${id}`, tarea, {
        headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
};

export const eliminarTarea = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
