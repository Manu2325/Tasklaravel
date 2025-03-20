import React, { useEffect, useState } from 'react';
import { getTareas, crearTarea, actualizarTarea, eliminarTarea } from './api';
import './Tareas.css';


const Tareas = () => {
    const [tareas, setTareas] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    
    useEffect(() => {
        cargarTareas();
    }, []);

    const cargarTareas = async () => {
        const data = await getTareas();
        setTareas(data);
    };

    const handleAgregarTarea = async () => {
        if (titulo.trim() === '') return;
        const nuevaTarea = await crearTarea({ titulo, descripcion, completado: false });
        setTareas([...tareas, nuevaTarea]);
        setTitulo('');
        setDescripcion('');
    };

    const handleEliminarTarea = async (id) => {
        await eliminarTarea(id);
        setTareas(tareas.filter((tarea) => tarea.id !== id));
    };

    const handleToggleCompletado = async (id) => {
        try {
            // Encontrar la tarea actual
            const tarea = tareas.find(t => t.id === id);
    
            // Si no se encuentra, salir
            if (!tarea) return;
    
            // Enviar toda la información requerida al backend
            const tareaActualizada = await actualizarTarea(id, { 
                titulo: tarea.titulo, // Se mantiene el mismo título
                descripcion: tarea.descripcion || '', // Si la descripción es nula, enviamos un string vacío
                completado: !tarea.completado // Alternar el estado de completado
            });
    
            // Actualizar la lista de tareas en el estado
            setTareas(tareas.map(t => t.id === id ? tareaActualizada : t));
        } catch (error) {
            console.error("Error al actualizar la tarea:", error.response?.data || error.message);
        }
    };
    

    return (
        <div>
            <h1>Gestión de Tareas</h1>
            <input 
                type="text" 
                placeholder="Título de la tarea" 
                value={titulo} 
                onChange={(e) => setTitulo(e.target.value)} 
            />
            <br />
            <textarea
                placeholder="Descripción de la tarea"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
            />
            <br />
            <button onClick={handleAgregarTarea}>Agregar</button>
            <ul>
                {tareas.map((tarea) => (
                    <li key={tarea.id}>
                        <span 
                            style={{ textDecoration: tarea.completado ? 'line-through' : 'none', cursor: 'pointer' }}
                            onClick={() => handleToggleCompletado(tarea.id, tarea.completado)}
                        >
                            <strong>{tarea.titulo}</strong> - {tarea.descripcion}
                        </span>
                        <label>
                            <input
                                type="checkbox"
                                checked={tarea.completado}
                                onChange={() => handleToggleCompletado(tarea.id, tarea.completado)}
                            />
                            Completado
                        </label>
                        <button onClick={() => handleEliminarTarea(tarea.id)}><span role="img" aria-label="Eliminar">❌</span></button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tareas;
