import React from "react";

import {
  Button,
  Container,
  Navbar as CustomNavbar,
  Nav,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { shoppingSvg } from "../utilities/shoppingCartLogo";

const Navbar = () => {
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
          className="p-2 d-flex flex-row align-items-center "
        >
          {shoppingSvg}
          <div
            className="text-bg-danger z-index-2 rounded-circle bg-danger  "
            style={{
              color: "white",
              width: "1.5rem",
              height: "1.5rem",
            }}
          >
            3
          </div>
        </Button>
      </Container>
    </CustomNavbar>
  );
};

export default Navbar;
