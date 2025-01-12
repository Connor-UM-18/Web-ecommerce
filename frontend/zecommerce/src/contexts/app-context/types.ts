export interface ContextProps {
  state: InitialState;
  dispatch: (args: ActionType) => void;
}

export interface User {
  id_usuario: string;
  correo_electronico: string;
  token: string;
}

export interface InitialState {
  cart: CartItem[];
  isHeaderFixed: boolean;
  products?: any;
  services?: any;
  blogs?: any;
  user: User | null;
}

export interface CartItem {
  qty: number;
  nombre: string;
  slug?: string;
  precio: number;
  imagen_url?: string;
  id_producto: string | number;
  talla?: number;
}

interface CartActionType {
  type: "CHANGE_CART_AMOUNT";
  payload: CartItem;
}

interface LayoutActionType {
  type: "TOGGLE_HEADER";
  payload: boolean;
}

interface RemoveFromCartActionType {
  type: "REMOVE_FROM_CART";
  payload: CartItem;
}

interface getPrductsActionType {
  type: "SET_PRODUCTS";
  payload: any;
}

interface SetUserActionType {
  type: "SET_USER";
  payload: User;
}

interface SetCartActionType {
  type: "SET_CART";
  payload: CartItem[];
}

interface LogoutUserActionType {
  type: "LOGOUT_USER";
}

interface ClearCartActionType {
  type: "CLEAR_CART";
}

export type ActionType = 
  CartActionType | 
  LayoutActionType | 
  RemoveFromCartActionType | 
  getPrductsActionType | 
  SetUserActionType | 
  SetCartActionType |
  ClearCartActionType |
  LogoutUserActionType;
