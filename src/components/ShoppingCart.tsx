import React from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import CartItems from "./CartItems";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/items.json";
interface ShoppingCartType {
  isOpen: boolean;
}
const ShoppingCart = ({ isOpen }: ShoppingCartType) => {
  const { closeCart, cartItems } = useShoppingCart();
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton></Offcanvas.Header>
      <Offcanvas.Title> Cart </Offcanvas.Title>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems?.map((item) => (
            <CartItems key={item.id} {...item} />
          ))}
        </Stack>
        <div className="d-flex justify-content-end m-3 fw-bold  fs-5">
          Total
          {formatCurrency(
            cartItems.reduce((acc, item) => {
              const itemFromStore = storeItems?.find((i) => i.id === item.id);
              return (acc += (itemFromStore?.price || 0) * item.quantity);
            }, 0)
          )}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;
