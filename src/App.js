import React, { useContext, useEffect, useState } from 'react';
import { TodoContext } from './context/TodoContext';
import ToDoForm from './Components/ToDoForm';
import ToDoItem from './Components/ToDoItem';
import TodoSearch from './Components/TodoSearch';
import Modal from './Components/Modal';
import './App.css';

function App() {
  const { tareas, setTareas, isLoading, setIsLoading, error, setError } = useContext(TodoContext);
  const [modoOscuro, setModoOscuro] = useState(false);
  const [filtroBusqueda, setFiltroBusqueda] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [tareaAEliminar, setTareaAEliminar] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      try {
        const tareasGuardadas = localStorage.getItem('tareas');
        setTareas(tareasGuardadas ? JSON.parse(tareasGuardadas) : []);
        setIsLoading(false);
      } catch (err) {
        setError('Error cargando las tareas');
        setIsLoading(false);
      }
    }, 1500);
  }, []);

  useEffect(() => {
    if (!isLoading && !error) {
      localStorage.setItem('tareas', JSON.stringify(tareas));
    }
  }, [tareas, isLoading, error]);

  const agregarTarea = (tareaTexto) => {
    if (tareaTexto.trim() === '') return;
    setTareas([...tareas, { texto: tareaTexto, completada: false }]);
  };

  const eliminarTarea = () => {
    setTareas(tareas.filter((_, i) => i !== tareaAEliminar));
    setModalOpen(false);
  };

  const toggleCompletada = (indice) => {
    const nuevasTareas = [...tareas];
    nuevasTareas[indice].completada = !nuevasTareas[indice].completada;
    setTareas(nuevasTareas);
  };

  const tareasFiltradas = tareas.filter((tarea) =>
    tarea.texto.toLowerCase().includes(filtroBusqueda)
  );

  const tareasCompletadas = tareas.filter((tarea) => tarea.completada).length;
  const porcentajeCompletado = tareas.length > 0 ? (tareasCompletadas / tareas.length) * 100 : 0;

  const toggleModoOscuro = () => setModoOscuro(!modoOscuro);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', modoOscuro);
  }, [modoOscuro]);

  return (
    <div className={`todo-container ${modoOscuro ? 'dark' : ''}`}>
      <header className="todo-header">
        <h1>Gestor de Tareas</h1>
        <p>Has completado {tareasCompletadas} de {tareas.length} tareas</p>
        <button className="toggle-mode" onClick={toggleModoOscuro}>
          {modoOscuro ? '🌞 Modo Claro' : '🌙 Modo Oscuro'}
        </button>
      </header>

      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${porcentajeCompletado}%` }}
        ></div>
      </div>

      <TodoSearch setFiltroBusqueda={setFiltroBusqueda} />
      <ToDoForm agregarTarea={agregarTarea} />

      {isLoading ? (
        Array(3).fill(0).map((_, i) => (
          <li key={i} className="todo-item skeleton">
            <div className="skeleton-text"></div>
          </li>
        ))
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <ul className="todo-list">
          {tareasFiltradas.map((tarea, indice) => (
            <ToDoItem
              key={indice}
              tarea={tarea}
              indice={indice}
              toggleCompletada={toggleCompletada}
              eliminarTarea={() => {
                setTareaAEliminar(indice);
                setModalOpen(true);
              }}
            />
          ))}
        </ul>
      )}

      {modalOpen && (
        <Modal>
          <h3>¿Estás seguro de eliminar esta tarea?</h3>
          <button onClick={eliminarTarea}>Sí</button>
          <button onClick={() => setModalOpen(false)}>No</button>
        </Modal>
      )}
    </div>
  );
}

export default App;
