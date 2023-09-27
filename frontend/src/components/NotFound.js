import { Link } from "react-router-dom/cjs/react-router-dom";
import "./css/404.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
const NotFound = () => {
  return (
    <div className="container text-center mt-5">
      <div className="row">
        <div className="col-12">
          <FontAwesomeIcon icon={faUserAstronaut} className="img-fluid astronaut"/>
          <h1 className="display-4 mt-4">404 - Page Not Found</h1>
          <p className="lead">Sorry, the page you're looking for doesn't exist.</p>
          <Link to="/" className="btn btn-primary btn-lg">
            Go Back to Home
          </Link>
        </div>
      </div>
    </div>
);}
 
export default NotFound;