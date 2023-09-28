import { ReactNode, createContext, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import useLocalStorage from "../hooks/useLocalStorage";

interface ShoppingCartProviderProps {
  children: ReactNode;
}
export interface CartItem {
  id: number;
  quantity: number;
}

interface ShoppingCartContext {
  openCart: () => void;
  closeCart: () => void;
  cartQuantity: number;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeCartItem: (id: number) => void;
  addItemsToCart: (id: number) => void;
  cartItems: CartItem[];
}
//create Context
const shoppingCartContext = createContext({} as ShoppingCartContext);

//make custom hook for using this context
export const useShoppingCart = () => useContext(shoppingCartContext);

//this will be used in app.tsx
export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const getItemQuantity = (id: number) => {
    return cartItems.find((item: CartItem) => item.id === id)?.quantity || 0;
  };

  const addItemsToCart = (id: number) => {
    setCartItems((curItem) => [...curItem, { id, quantity: 1 }]);
  };

  const increaseCartQuantity = (id: number) => {
    const index = cartItems.findIndex((item) => item.id === id);
    const curQuantity: number = cartItems[index]?.quantity;
    cartItems.splice(index, 1, {
      id,
      quantity: curQuantity + 1,
    });
    setCartItems([...cartItems]);
  };
  const decreaseCartQuantity = (id: number) => {
    const index = cartItems.findIndex((item) => item.id === id);
    if (cartItems[index].quantity === 1) {
      cartItems.splice(index, 1);
    } else {
      cartItems[index].quantity -= 1;
    }
    setCartItems([...cartItems]);
  };
  const removeCartItem = (id: number) => {
    setCartItems((currItem) => currItem.filter((item) => item.id !== id));
  };
  const cartQuantity = cartItems.reduce(
    (acc, item) => (acc += item.quantity),
    0
  );
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  return (
    <shoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeCartItem,
        addItemsToCart,
        cartQuantity,
        cartItems,
        openCart,
        closeCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </shoppingCartContext.Provider>
  );
};
