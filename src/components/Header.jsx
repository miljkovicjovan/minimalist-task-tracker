import LOGO from "../assets/logo.png";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Nav className="pt-4 d-flex justify-content-center">
      <Nav.Item>
        <Link to="/">
          <img draggable="false" loading="eager" width="245" src={LOGO} alt="logo" />
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/archive">
          Archive
        </Link>
      </Nav.Item>
    </Nav>
  );
}

export default Header;
