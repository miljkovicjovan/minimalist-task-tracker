import LOGO from "../assets/logo.png";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Nav className="pt-4 d-flex flex-column flex-md-row justify-content-center align-items-center">
      {/* This item is hidden in order to make the Logo be centered horizontally */}
      <Nav.Item className="d-md-block d-none" style={{ visibility: 'hidden' }}>
        <Link to="/archive">
          Archived Tasks
        </Link>
      </Nav.Item>
      <Nav.Item className="mx-5">
        <Link to="/">
          <img draggable="false" loading="eager" width="245" src={LOGO} alt="logo" />
        </Link>
      </Nav.Item>
      <Nav.Item className="nav-link m-0 px-0 pt-2 pb-0">
        <Link to="/archive">
          Archived Tasks
        </Link>
      </Nav.Item>
    </Nav>
  );
}

export default Header;
