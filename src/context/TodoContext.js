import React, { createContext, useState } from 'react';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [tareas, setTareas] = useState([]);
  const [modoOscuro, setModoOscuro] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <TodoContext.Provider value={{ tareas, setTareas, isLoading, setIsLoading, error, setError }}>
      {children}
    </TodoContext.Provider>
  );
};
