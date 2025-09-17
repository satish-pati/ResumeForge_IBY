import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => {
    return localStorage.getItem("userId") || null;
  });

  const login = (id) => {
    console.log("user", id);
    setUserId(id);
    localStorage.setItem("userId", id); // Store userId in localStorage
  };

  const logout = () => {
    setUserId(null);
    localStorage.removeItem("userId"); // Remove userId from storage on logout
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userId, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
