import React from "react";

import {
  Button,
  Container,
  Navbar as CustomNavbar,
  Nav,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { shoppingSvg } from "../utilities/shoppingCartLogo";
import { useShoppingCart } from "../context/ShoppingCartContext";

const Navbar = () => {
  const { openCart, closeCart, cartQuantity } = useShoppingCart();
  return (
    <CustomNavbar className="bg-white shadow-lg mb-3">
      <Container>
        <Nav className="me-auto ">
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to="/store" as={NavLink}>
            Store
          </Nav.Link>
          <Nav.Link to="/about" as={NavLink}>
            About
          </Nav.Link>
        </Nav>

        <Button
          variant="outline-primary"
          className=" p-2 d-flex flex-row align-items-center rounded-circle  "
          style={{ position: "relative" }}
          onClick={openCart}
        >
          {shoppingSvg}
          <div
            className="text-bg-danger z-index-2 rounded-circle bg-danger"
            style={{
              position: "absolute",
              color: "white",
              bottom: "-8px",
              right: "-8px",
              width: "1.5rem",
              height: "1.5rem",
            }}
          >
            {cartQuantity}
          </div>
        </Button>
      </Container>
    </CustomNavbar>
  );
};

export default Navbar;
