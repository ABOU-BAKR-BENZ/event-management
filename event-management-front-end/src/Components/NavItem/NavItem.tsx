import { HashLink } from "react-router-hash-link";
import "./NavItem.css";

const NavItem = ({
    children,
    direction,
}: {
    children: string;
    direction: string;
}) => {
    return (
        <li className="nav-item">
            <HashLink
                className="nav-link"
                aria-current="page"
                smooth
                to={direction}
            >
                {children}
            </HashLink>
        </li>
    );
};

export default NavItem;
