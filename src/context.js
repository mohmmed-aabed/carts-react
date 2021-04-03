import React, { useContext, useReducer, useEffect } from 'react';
import reducer from './reducer';

const url = 'https://course-api.com/react-useReducer-cart-project';
const AppContext = React.createContext();

const initialState = {
  loading: false,
  carts: [],
  total: 0,
  amount: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const removeCart = (id) => {
    dispatch({ type: 'REMOVE_CART', payload: id });
  };

  const change = (id, type) => {
    dispatch({ type: 'CHANGE', payload: { id, type } });
  };

  const fetchData = async () => {
    dispatch({ type: 'LOADING' });
    const resopnse = await fetch(url);
    const carts = await resopnse.json();
    dispatch({ type: 'DISPLAY_CARTS', payload: carts });
  };

  useEffect(() => {
    dispatch({ type: 'GET_TOTAL' });
  }, [state.carts]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeCart,
        change,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
