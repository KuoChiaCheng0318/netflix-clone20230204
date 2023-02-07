import React, {useEffect, useState} from 'react'
import "./Nav.css"


function Nav() {
    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            handleShow(true);
        } else handleShow(false);
        });
        return () => {window.removeEventListener("scroll", null)};
        // need null!!, removeEventListener need two arguments
    }, []);

    return (
        <div className={`nav ${show && "nav__black"}`}>
        {/* <div className="nav"> */}
            <img
                className='nav__logo'
                src="logo-no-background.png"
                alt="charles-project-logo" />
            <img
                className='nav__avatar'
                src="index.jpeg"
                alt="avatar" />
        </div>
    )
}

export default Nav