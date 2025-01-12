"use client";

import { useMemo, useReducer, useContext, createContext, PropsWithChildren, useEffect } from "react";
import Cookies from "js-cookie";
import { ActionType, InitialState, ContextProps, CartItem } from "./types";
import { INITIAL_CART } from "./data";

const INITIAL_STATE = {
  cart: INITIAL_CART as CartItem[],
  isHeaderFixed: false,
  products: [],
  user: null
};

export const AppContext = createContext<ContextProps>({
  state: INITIAL_STATE,
  dispatch: () => { }
});

const reducer = (state: InitialState, action: ActionType) => {
  switch (action.type) {
    case "TOGGLE_HEADER":
      return { ...state, isHeaderFixed: action.payload };

    case "CHANGE_CART_AMOUNT":
      let cartList = state.cart;
      let cartItem = action.payload;
      let exist = cartList.find((item) => item.id_producto === cartItem.id_producto);

      if (cartItem.qty < 1) {
        const filteredCart = cartList.filter((item) => item.id_producto !== cartItem.id_producto);
        return { ...state, cart: filteredCart };
      }

      // IF PRODUCT ALREADY EXITS IN CART
      if (exist) {
        const newCart = cartList.map((item) =>
          item.id_producto === cartItem.id_producto ? { ...item, qty: cartItem.qty } : item
        );

        return { ...state, cart: newCart };
      }

      return { ...state, cart: [...cartList, cartItem] };

    case "REMOVE_FROM_CART":
      const filteredCart = state.cart.filter((item) => item.id_producto !== action.payload.id_producto);
      return { ...state, cart: filteredCart };

    case "SET_PRODUCTS":
      return { ...state, products: action.payload };

    case "SET_USER":
      return { ...state, user: action.payload };

    case "SET_CART":
      return { ...state, cart: action.payload };

    case "CLEAR_CART":
      return { ...state, cart: [] }; // Limpiar completamente el carrito

    case "LOGOUT_USER":
      return { ...state, user: null };

    default: {
      return state;
    }
  }
};

export function AppProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      dispatch({ type: "SET_CART", payload: JSON.parse(storedCart) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    const token = Cookies.get("token");
    const email = Cookies.get("correo_electronico");
    const userId = Cookies.get("id_usuario");

    if (token && email && userId) {
      const user = {
        token,
        correo_electronico: email,
        id_usuario: userId
      };
      dispatch({ type: "SET_USER", payload: user });
    }
  }, []);

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export const useAppContext = () => useContext<ContextProps>(AppContext);
