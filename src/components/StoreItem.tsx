
import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";

export interface StoreItemProps {
  id: number;
  name: string;
  price: number;
  imgURL: string;
}
const StoreItem = ({ id, name, price, imgURL }: StoreItemProps) => {
  const formattedPrice = formatCurrency(price);
  const {
    removeCartItem,
    decreaseCartQuantity,
    increaseCartQuantity,
    getItemQuantity,
    addItemsToCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={imgURL} height={"200px"} />
      <Card.Body className="d-flex flex-column ">
        <Card.Title
          className="d-flex
        justify-content-between align-items-baseline mb-4"
        >
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted ">{formattedPrice}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => addItemsToCart(id)}>
              + Add to cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: "0.5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: "0.5rem" }}
              >
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                <div>
                  <span className="fs-5">{quantity} in Cart</span>
                </div>
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeCartItem(id)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
