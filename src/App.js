import React, { useState, useEffect } from 'react';
import ToDoForm from './Components/ToDoForm';
import ToDoItem from './Components/ToDoItem';
import TodoSearch from './Components/TodoSearch';
import './App.css';

function App() {
  const [tareas, setTareas] = useState([]);
  const [modoOscuro, setModoOscuro] = useState(false);
  const [filtroBusqueda, setFiltroBusqueda] = useState('');

  const agregarTarea = (tareaTexto) => {
    if (tareaTexto.trim() === '') return;
    setTareas([...tareas, { texto: tareaTexto, completada: false }]);
  };

  const eliminarTarea = (indice) => {
    setTareas(tareas.filter((_, i) => i !== indice));
  };

  const toggleCompletada = (indice) => {
    const nuevasTareas = [...tareas];
    nuevasTareas[indice].completada = !nuevasTareas[indice].completada;
    setTareas(nuevasTareas);
  };

  const tareasCompletadas = tareas.filter((tarea) => tarea.completada).length;
  const porcentajeCompletado = tareas.length > 0 ? (tareasCompletadas / tareas.length) * 100 : 0;

  const toggleModoOscuro = () => {
    setModoOscuro(!modoOscuro);
  };

  useEffect(() => {
    if (modoOscuro) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [modoOscuro]);

  const tareasFiltradas = tareas.filter((tarea) =>
    tarea.texto.toLowerCase().includes(filtroBusqueda)
  );

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

      <ul className="todo-list">
        {tareasFiltradas.map((tarea, indice) => (
          <ToDoItem
            key={indice}
            tarea={tarea}
            indice={indice}
            toggleCompletada={toggleCompletada}
            eliminarTarea={eliminarTarea}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
