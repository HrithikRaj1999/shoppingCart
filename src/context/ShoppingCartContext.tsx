import { ReactNode, createContext, useContext, useState } from "react";
import { StoreItemProps } from "../components/StoreItem";

interface ShoppingCartProviderProps {
  children: ReactNode;
}
interface CartItem {
  id: number;
  quantity: number;
}

interface ShoppingCartContext {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeCartItem: (id: number) => void;
  addItemsToCart: (id: number) => void;
}
//create Context
const shoppingCartContext = createContext({} as ShoppingCartContext);

//make custom hook for using this context
export const useShoppingCart = () => useContext(shoppingCartContext);

//this will be used in app.tsx
export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  console.log(cartItems);
  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
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
  return (
    <shoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeCartItem,
        addItemsToCart,
      }}
    >
      {children}
    </shoppingCartContext.Provider>
  );
};
