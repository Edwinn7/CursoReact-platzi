import React, { useState } from 'react';

function ToDoForm({ agregarTarea }) {
  const [nuevaTarea, setNuevaTarea] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarTarea(nuevaTarea);
    setNuevaTarea(''); // Limpiar el campo después de añadir la tarea
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={nuevaTarea}
        onChange={(e) => setNuevaTarea(e.target.value)}
        placeholder="Añadir nueva tarea..."
        className="new-task-input" // Clase para los nuevos estilos
        aria-label="Campo para añadir una nueva tarea"
      />
      <button type="submit" className="add-task-btn">
        Añadir
      </button>
    </form>
  );
}

export default ToDoForm;
