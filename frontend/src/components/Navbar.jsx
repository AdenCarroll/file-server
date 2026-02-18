import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Container } from "reactstrap";
import { NavLink as RouterNavLink } from "react-router-dom";

export default function AppNavbar() {
  return (
    <Navbar color="dark" dark expand="md">
      <Container fluid>
        <NavbarBrand tag={RouterNavLink} to="/">
          <span className="lead">Aden's Legendary File Server Service</span>
        </NavbarBrand>

        <Nav className="ms-auto" navbar>
          <NavItem>
            <NavLink tag={RouterNavLink} to="/" end>
              <span className="lead">Home</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RouterNavLink} to="/upload">
              <span className="lead">Upload</span>
            </NavLink>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  );
}
