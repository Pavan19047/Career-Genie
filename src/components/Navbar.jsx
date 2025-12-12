import  { useState } from 'react';
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function Navbar() {
    let navigate = useNavigate();
    const [menuClicked, setmenuClicked] = useState(1);
    return (
        <nav className="navBar">
            <label className="logo" onClick={() => { navigate("/") }}><label className="logo-half">Career</label>Genie</label>
            <ul className={menuClicked ? "nav__links" : "nav__links active"} >
                <li><a className="active" onClick={() => { navigate("/") }}>Home</a></li>
                <li><a onClick={() => { navigate("/test") }}>Career Test</a></li>
                <li><a onClick={() => { navigate("/dashboard") }}>Dashboard</a></li>
                <button onClick={() => { navigate("/contact") }}>Contact Us</button>
            </ul>
            <div id="menuIcon" onClick={() => { if (menuClicked) { setmenuClicked(0) } else { setmenuClicked(1) } }}>{menuClicked ? <FaBars /> : <FaTimes />}</div>


        </nav>

    )
}

export default Navbar;