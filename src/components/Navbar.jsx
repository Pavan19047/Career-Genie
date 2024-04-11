import  { useState } from 'react';
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { useHistory } from "react-router-dom";
function Navbar() {
    let history = useHistory();
    const [menuClicked, setmenuClicked] = useState(1);
    return (
        <nav className="navBar">
            <label className="logo" onClick={() => { history.push("/") }}><label className="logo-half">Career</label>Genie</label>
            <ul className={menuClicked ? "nav__links" : "nav__links active"} >
                <li><a className="active" onClick={() => { history.push("/") }}>Home</a></li>
                <li><a onClick={() => { history.push("/test") }}>Career Test</a></li>
                <li><a onClick={() => { history.push("/about") }}>About us</a></li>
                <button>Contact Us</button>
            </ul>
            <div id="menuIcon" onClick={() => { if (menuClicked) { setmenuClicked(0) } else { setmenuClicked(1) } }}>{menuClicked ? <FaBars /> : <FaTimes />}</div>


        </nav>

    )
}

export default Navbar;