import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const {user, logout} = useContext(AuthContext);
    const cartItems = useSelector(state => state.cart.cartItems);
    const cartCount = cartItems.reduce((total, item) => total + (item.qty || 1), 0);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

  return (
    <nav className="navbar">
        <div className="navbar-brand">
            <Link to="/" >
                <img src="/ShopNestLogo.png" alt="ShopNest Logo" className="navbar-logo"/>
                ShopNest
            </Link>
        </div>
        <ul className="navbar-links">
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/cart">Cart({cartCount})</Link></li>
            {user ? (
                <>
                    <li><Link to="/profile">Hi, {user.name}</Link></li>
                    {user.role === 'admin' && <li><Link to="/admin">Admin</Link></li>}
                    <li><button onClick={handleLogout} className="btn-logout">Logout</button></li>
                </>      
            ) : (
                <li><Link to="/login">Login</Link></li>
            )}
        </ul>
    </nav>
  );
};

export default Navbar;