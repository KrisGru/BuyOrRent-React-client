import { useState } from "react";
import { createContext, useContext } from "react";

export const AppContext = createContext(null);

export function AppWrapper({ children }) {
  const [input, setInput] = useState("");
  const [modalBook, setModalBook] = useState(false);
  const [fetchingBook, setFetchingBook] = useState(false);
  const [basketBuy, setBasketBuy] = useState([]);
  const [basketRent, setBasketRent] = useState([]);
  const [user, setUser] = useState({
    logged: false,
    data: false,
  });

  return (
    <AppContext.Provider
      value={{
        input,
        setInput,
        modalBook,
        setModalBook,
        fetchingBook,
        setFetchingBook,
        basketBuy,
        setBasketBuy,
        basketRent,
        setBasketRent,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
