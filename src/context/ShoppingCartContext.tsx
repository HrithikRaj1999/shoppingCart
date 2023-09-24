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
    setCartItems((currItem) => {
      const index = currItem.findIndex((item) => item.id === id);
      const curQuantity: number = currItem[index]?.quantity;
      currItem.splice(index, 1, {
        id,
        quantity: curQuantity + 1,
      });
      console.log({ currItem, index, curQuantity });
      return [...currItem];
    });
  };
  const decreaseCartQuantity = (id: number) => {
    setCartItems((currItem) => {
      let index = -1;
      const curQuantity: number =
        currItem.find((item, indx) => {
          if (item.id === id) {
            index = indx;
            return item;
          }
        })?.quantity || 0;

      currItem.splice(index, 1, {
        id,
        quantity: curQuantity > 0 ? curQuantity - 1 : 0,
      });
      return [...currItem];
    });
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
