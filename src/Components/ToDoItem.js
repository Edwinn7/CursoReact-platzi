import React from 'react';

function ToDoItem({ tarea, indice, toggleCompletada, eliminarTarea }) {
  return (
    <li className={`todo-item ${tarea.completada ? 'completada' : ''}`}>
      <span className="todo-text">{tarea.texto}</span>
      <div className="todo-buttons">
        {/* Botón para marcar como completada */}
        <button
          className={`complete-button ${tarea.completada ? 'completada' : ''}`}
          onClick={() => toggleCompletada(indice)}
          aria-label={`Marcar tarea ${tarea.texto} como completada`}
        > ✔
          <i className="fas fa-check"></i> {/* Icono de check (completar) */}
        </button>
        {/* Botón para eliminar */}
        <button
          className="delete-button"
          onClick={() => eliminarTarea(indice)}
          aria-label={`Eliminar tarea ${tarea.texto}`}
        > ✖
          <i className="fas fa-trash"></i> {/* Icono de eliminar */}
        </button>
      </div>
    </li>
  );
}

export default ToDoItem;