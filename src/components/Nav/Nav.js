// Nav.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'; // Opcional, para estilos

const Nav = () => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const handleMouseEnter = () => {
        setDropdownVisible(true);
    };

    const handleMouseLeave = () => {
        setDropdownVisible(false);
    };

    return (
        <nav className="nav">
            <ul className="nav-list">
                <li className="nav-item">
                    <Link to="/">Página 1</Link>
                </li>
                <li
                    className="nav-item"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <Link to="/pagina2">Página 2</Link>
                    {isDropdownVisible && (
                        <ul className="dropdown-menu">
                            <li className="dropdown-item">
                                <Link to="/pagina2a">Página 2A</Link>
                            </li>
                            <li className="dropdown-item">
                                <Link to="/pagina2b">Página 2B</Link>
                            </li>
                        </ul>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
