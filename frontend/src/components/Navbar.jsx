import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">code-review-assistant</Link>
      <nav className="navbar-links">
        <Link to="/submit">submit</Link>
        <Link to="/history">history</Link>
        {user ? (
          <>
            <span className="navbar-user">{user.name}</span>
            <button className="navbar-logout" onClick={handleLogout}>log out</button>
          </>
        ) : (
          <>
            <Link to="/login">log in</Link>
            <Link to="/register">sign up</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;