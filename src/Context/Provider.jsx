import React, { useState } from "react";
import { useEffect } from "react";
import StoreContext from "./StoreContext";

const StoreProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);

  const fetchCategories = async () => {
    const URL = "https://api.mercadolibre.com/sites/MLB/categories";
    const data = await fetch(URL);
    const jsonData = await data.json();
    setCategories(jsonData);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const context = {
    categories,
    setCategories,
    cart,
    setCart,
  };

  return (
    <StoreContext.Provider value={context}>{children}</StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider as Provider };
