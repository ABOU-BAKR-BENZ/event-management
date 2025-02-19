import { NavLink } from "react-router-dom";
import "./NavLinkRoute.css";

const NavLinkRoute = ({
  children,
  direction,
}: {
  children: string;
  direction: string;
}) => {
  return (
    <li className="nav-item">
      <NavLink className="nav-link" aria-current="page" to={direction}>
        {children}
      </NavLink>
    </li>
  );
};

export default NavLinkRoute;
