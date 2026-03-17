import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Omni School</div>
      <ul className="nav-links">
        <li><Link to="/admin">Admin</Link></li>
        <li><Link to="/teacher">Teacher</Link></li>
        <li><Link to="/parent-login">Parent Portal</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;