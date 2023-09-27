import { React,  useEffect,  useState } from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faComment, faHeadphones, faShoppingCart, faTicket, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
    const links = document.querySelectorAll('.navbar-item');
    links.forEach(e=>{
      e.addEventListener('click',()=>{
        setIsMenuOpen(false);
      })
    })
  }, []);

  return (
    <div className="">
      <header className="bg-secondary">
        <nav className="navbar navbar-expand-md navbar-dark">
          <div className="container">
             <Link to="/" onClick={() => setIsMenuOpen(false)}  className="navbar-brand">
               <h1 className="text-light text-lg font-primary">
                 Studio <span className="text-primary">X</span>
               </h1>
             </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navmenu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className={`icon ${isMenuOpen ? 'active': '' }`} id="toggle">
                <div className="line line1"></div>
                <div className="line line2"></div>
                <div className="line line3"></div>
              </span>
            </button>
            <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navmenu">
              <ul className="navbar-nav ms-auto">
                <li className="navbar-item">
                  <Link to="/store" className="nav-link text-primary">
                    <FontAwesomeIcon icon={faShoppingCart} />
                    Store
                  </Link>
                </li>

                <li className="navbar-item">
                  <Link to="/charts" className="nav-link text-primary">
                    <FontAwesomeIcon icon={faHeadphones} />
                    Charts
                  </Link>
                </li>

                  <li className="navbar-item">
                    <Link to="/artists" className="nav-link text-primary">
                      <FontAwesomeIcon icon={faUsers} />
                      Artists
                    </Link>
                  </li>

                  <li className="navbar-item">
                    <Link to="/events" className="nav-link text-primary">
                      <FontAwesomeIcon icon={faTicket} />
                      Events
                    </Link>
                  </li>

                <li className="navbar-item">
                  <Link to="/blogs" className="nav-link text-primary">
                    <FontAwesomeIcon icon={faComment} />
                    Blog
                  </Link>
                </li>

                <div className="navbar-item hide-lg">
                  <button className="btn outline btn-primary text-light col-9">
                    <FontAwesomeIcon icon={faUser} />
                    Log In or Register
                  </button>
                </div>
              </ul>
            </div>
        </div>
      </nav>
      </header>
    </div>
  );
};

export default Navbar;
