import "./PageNotFound.css";
import { NavBar } from "../../Sections/index";
import PageNotFoundImage from "../../Assets/Images/PageNotFound.webp";
import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <>
            <NavBar />
            <div className="Error404">
                <div>
                    <img src={PageNotFoundImage} alt="404 Error" />
                </div>
                <Link to="/" className="Go-Back">
                    <h1>Go Back Home</h1>
                </Link>
            </div>
        </>
    );
};

export default PageNotFound;
