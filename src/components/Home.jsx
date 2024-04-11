// import React from 'react';
import './Home.css'
import { useHistory } from "react-router-dom";
function Home() {
    let history = useHistory();
    return (
        <div className="container">
            <div className="slider-image"></div>
            <div className="button-box">
                <button className="result-btn ">Start Test</button>
                <button className="result-btn mrl10" onClick={() => { history.push("/result") }}>Get Result</button>

            </div>

        </div>

    )
}

export default Home;
