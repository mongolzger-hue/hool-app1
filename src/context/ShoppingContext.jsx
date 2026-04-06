import { createContext, useContext, useState, useEffect } from 'react';

const ShoppingContext = createContext();

export const useShopping = () => useContext(ShoppingContext);

export const ShoppingProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Load from localStorage safely
    try {
      const savedItems = localStorage.getItem('hool_shopping_list');
      if (savedItems) {
        setItems(JSON.parse(savedItems));
      }
    } catch (err) {
      console.error('Error parsing shopping list from localStorage:', err);
      localStorage.removeItem('hool_shopping_list'); // Clear corrupt data
    }
  }, []);

  const addToCart = (newItems) => {
    // newItems is an array of ingredient names/strings from a recipe
    const formattedItems = newItems.map((name) => ({
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      name,
      checked: false,
      addedAt: new Date().toISOString(),
    }));

    const updatedItems = [...items, ...formattedItems];
    setItems(updatedItems);
    localStorage.setItem('hool_shopping_list', JSON.stringify(updatedItems));
  };

  const toggleItem = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
    localStorage.setItem('hool_shopping_list', JSON.stringify(updatedItems));
  };

  const removeItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem('hool_shopping_list', JSON.stringify(updatedItems));
  };

  const clearChecked = () => {
    const updatedItems = items.filter((item) => !item.checked);
    setItems(updatedItems);
    localStorage.setItem('hool_shopping_list', JSON.stringify(updatedItems));
  };

  const clearAll = () => {
    setItems([]);
    localStorage.removeItem('hool_shopping_list');
  };

  return (
    <ShoppingContext.Provider value={{ items, addToCart, toggleItem, removeItem, clearChecked, clearAll }}>
      {children}
    </ShoppingContext.Provider>
  );
};
