import React, { useEffect } from 'react'
import './Nav.css';


function Nav() {
    const [show, handleshow] = React.useState(false);

    useEffect (() => {
        const handleScroll = () => {
            if(window.scrollY > 100) { 
               handleshow(true);
            } else handleshow(false);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleLogoClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

                


  return (
    <div className={`nav ${show && "nav__black"}`}>
        <img 
            className='nav__logo'
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
             alt="Netflix Logo"
            onClick={handleLogoClick}
            style={{ cursor: 'pointer' }}
        
        />

        <img
            className='nav__avatar'
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="Netflix Logo"

        
        />


    </div>
  )
}

export default Nav
