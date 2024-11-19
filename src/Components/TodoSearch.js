import React from 'react';

function TodoSearch({ setFiltroBusqueda }) {
  const handleSearch = (e) => {
    setFiltroBusqueda(e.target.value.toLowerCase());
  };

  return (
    <div className="todo-search">
      <input
        type="text"
        placeholder="Buscar tarea..."
        onChange={handleSearch}
        className="search-input"
        aria-label="Campo para buscar tarea"
      />
    </div>
  );
}

export default TodoSearch;
