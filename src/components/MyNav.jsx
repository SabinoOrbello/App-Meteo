import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const MyNav = () => {
  return (
    <Navbar expand="lg" className="bg-primary text-white rounded-bottom sticky-top">
      <Container fluid="xl">
        <Navbar.Brand className="text-white fw-bold">App-Meteo</Navbar.Brand>
        <Nav className="ms-auto">
          <NavLink to="/" className="nav-link text-white">
            Home
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default MyNav;
