
import {  useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import { Button, Stack } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
interface CartItemsProps {
  id: number;
  quantity: number;
}
const CartItems = ({ id, quantity }: CartItemsProps) => {
  const { removeCartItem } = useShoppingCart();
  const item = storeItems.find((i) => i.id === id);
  if (!item) return null;
  return (
    <Stack direction="horizontal" gap={2}>
      <img src={item.imgURL} style={{ width: "125px", height: "75px" }} />
      <div className="me-auto">
        <div>
          {item.name}
          {quantity > 0 && (
            <span className="text-muted" style={{ fontSize: "1rem" }}>
              x {quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: "0.75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div className="text-muted" style={{ fontSize: "0.75rem" }}>
        {formatCurrency(quantity * item.price)}
      </div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeCartItem(id)}
      >
        X
      </Button>
    </Stack>
  );
};
export default CartItems;
