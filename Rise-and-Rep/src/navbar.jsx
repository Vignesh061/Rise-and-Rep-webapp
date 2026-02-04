import { useState } from 'react';

function Navbar(){
    const [isActive, setIsActive] = useState(false);

    const toggleMenu = () => {
        setIsActive(!isActive);
    };

    return(
        <nav className="nav">
            <div className="nav-container">
                <div className="brandname"> 
                    <a href="#home">Rise&Rep</a>
                </div>
                <ul className={`nav-links ${isActive ? 'active' : ''}`}>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#programs">Programs</a></li>
                    <li><a href="#trainer">Trainer</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <div className={`hamburger ${isActive ? 'active' : ''}`} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;