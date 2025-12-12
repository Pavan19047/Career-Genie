import './Home.css';
import { useNavigate } from "react-router-dom";
import { FaRegLightbulb, FaChartLine, FaUserGraduate, FaStar } from 'react-icons/fa';

function Home() {
    let navigate = useNavigate();
    return (
        <div className="container">
            <div className="hero-section">
                <h1 className="hero-title">
                    Discover Your <span className="highlight">Perfect Career</span>
                </h1>
                <p className="hero-subtitle">
                    AI-powered assessments to guide you toward your dream career path
                </p>
            </div>
            
            <div className="slider-image"></div>
            
            <div className="features-section">
                <div className="feature-card">
                    <FaUserGraduate className="feature-icon" />
                    <h3>Personality Analysis</h3>
                    <p>Deep insights into your traits</p>
                </div>
                <div className="feature-card">
                    <FaChartLine className="feature-icon" />
                    <h3>Skills Assessment</h3>
                    <p>Evaluate your abilities</p>
                </div>
                <div className="feature-card">
                    <FaStar className="feature-icon" />
                    <h3>Career Matching</h3>
                    <p>Find your perfect fit</p>
                </div>
                <div className="feature-card">
                    <FaRegLightbulb className="feature-icon" />
                    <h3>Learning Path</h3>
                    <p>Personalized roadmap</p>
                </div>
            </div>

            <div className="button-box">
                <button className="result-btn primary-btn" onClick={() => { navigate("/test") }}>
                    <FaUserGraduate /> Start Assessment
                </button>
                <button className="result-btn secondary-btn mrl10" onClick={() => { navigate("/result") }}>
                    <FaChartLine /> View Sample Results
                </button>
            </div>
        </div>
    )
}

export default Home;
