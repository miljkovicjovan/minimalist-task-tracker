import LOGO from "../assets/logo.png";
function Header() {
  return (
    <img draggable="false" loading="eager" width="245" src={LOGO} alt="logo" />
  );
}

export default Header;
