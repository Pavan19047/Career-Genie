import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Progress, ChakraProvider, Box } from "@chakra-ui/react";
import { FaBriefcase, FaGraduationCap, FaBook, FaStar, FaDownload, FaChartLine } from 'react-icons/fa';
import "./Result.css";

function Result() {
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [careerMatches, setCareerMatches] = useState([]);
  const [skillsProfile, setSkillsProfile] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const assessmentData = localStorage.getItem('careerAssessmentResults');
    if (!assessmentData) {
      navigate('/test');
      return;
    }

    const data = JSON.parse(assessmentData);
    processResults(data);
  }, [navigate]);

  const processResults = (data) => {
    // Calculate career matches based on personality, skills, interests, and academics
    const matches = calculateCareerMatches(data);
    const skills = calculateSkillsProfile(data);
    
    setCareerMatches(matches);
    setSkillsProfile(skills);
    setResults(data);
    setLoading(false);
  };

  const calculateCareerMatches = (data) => {
    // Career database with requirements
    const careers = [
      {
        name: 'Software Engineer',
        field: 'Technology',
        requiredTraits: {
          technical: 4,
          analytical: 4,
          problem_solving: 4,
          math: 3,
          computer: 4
        },
        salary: '$95,000 - $150,000',
        growth: 'High (22% growth)',
        description: 'Design, develop, and maintain software applications and systems.'
      },
      {
        name: 'Data Scientist',
        field: 'Technology',
        requiredTraits: {
          analytical: 5,
          quantitative: 5,
          technical: 4,
          math: 5,
          science: 4
        },
        salary: '$100,000 - $160,000',
        growth: 'Very High (35% growth)',
        description: 'Analyze complex data to help organizations make better decisions.'
      },
      {
        name: 'UX/UI Designer',
        field: 'Design',
        requiredTraits: {
          creative: 5,
          technical: 3,
          communication: 4,
          arts: 4,
          detail: 4
        },
        salary: '$75,000 - $120,000',
        growth: 'High (13% growth)',
        description: 'Create intuitive and engaging user experiences for digital products.'
      },
      {
        name: 'Business Analyst',
        field: 'Business',
        requiredTraits: {
          analytical: 4,
          communication: 5,
          organization: 4,
          social: 4,
          quantitative: 3
        },
        salary: '$70,000 - $110,000',
        growth: 'Moderate (14% growth)',
        description: 'Bridge the gap between IT and business using data analytics.'
      },
      {
        name: 'Healthcare Professional',
        field: 'Healthcare',
        requiredTraits: {
          agreeableness: 5,
          science: 4,
          detail: 5,
          emotional_stability: 4,
          communication: 4
        },
        salary: '$80,000 - $200,000',
        growth: 'High (16% growth)',
        description: 'Provide medical care and support to patients in various settings.'
      },
      {
        name: 'Marketing Manager',
        field: 'Business',
        requiredTraits: {
          creative: 4,
          communication: 5,
          leadership: 4,
          extroversion: 4,
          social: 4
        },
        salary: '$75,000 - $130,000',
        growth: 'Moderate (10% growth)',
        description: 'Plan and execute marketing strategies to promote products or services.'
      },
      {
        name: 'Research Scientist',
        field: 'Science',
        requiredTraits: {
          analytical: 5,
          science: 5,
          detail: 5,
          openness: 5,
          math: 4
        },
        salary: '$80,000 - $140,000',
        growth: 'Moderate (7% growth)',
        description: 'Conduct experiments and research to advance scientific knowledge.'
      },
      {
        name: 'Teacher/Educator',
        field: 'Education',
        requiredTraits: {
          communication: 5,
          agreeableness: 5,
          organization: 4,
          emotional_stability: 4,
          languages: 4
        },
        salary: '$50,000 - $80,000',
        growth: 'Moderate (8% growth)',
        description: 'Educate and inspire students to reach their full potential.'
      },
      {
        name: 'Financial Analyst',
        field: 'Finance',
        requiredTraits: {
          quantitative: 5,
          analytical: 5,
          detail: 5,
          math: 5,
          organization: 4
        },
        salary: '$70,000 - $120,000',
        growth: 'Moderate (6% growth)',
        description: 'Analyze financial data to guide business and investment decisions.'
      },
      {
        name: 'Mechanical Engineer',
        field: 'Engineering',
        requiredTraits: {
          analytical: 4,
          math: 5,
          science: 5,
          technical: 4,
          detail: 4
        },
        salary: '$75,000 - $115,000',
        growth: 'Moderate (7% growth)',
        description: 'Design and develop mechanical systems and products.'
      },
      {
        name: 'Graphic Designer',
        field: 'Arts',
        requiredTraits: {
          creative: 5,
          arts: 5,
          technical: 3,
          detail: 4,
          communication: 3
        },
        salary: '$50,000 - $85,000',
        growth: 'Low (3% growth)',
        description: 'Create visual concepts to communicate ideas that inspire and inform.'
      },
      {
        name: 'Project Manager',
        field: 'Business',
        requiredTraits: {
          leadership: 5,
          organization: 5,
          communication: 5,
          emotional_stability: 4,
          conscientiousness: 5
        },
        salary: '$85,000 - $135,000',
        growth: 'High (11% growth)',
        description: 'Plan, execute, and oversee projects to achieve specific goals.'
      }
    ];

    // Calculate match score for each career
    const matchedCareers = careers.map(career => {
      let score = 0;
      let maxScore = 0;

      // Map assessment data to career requirements
      const userProfile = {
        technical: (data.skills?.s5 || 0),
        analytical: (data.personality?.p7 || 0),
        problem_solving: (data.skills?.s1 || 0),
        creative: (data.skills?.s2 || 0),
        communication: (data.skills?.s3 || 0),
        quantitative: (data.skills?.s4 || 0),
        detail: (data.skills?.s6 || 0),
        organization: (data.skills?.s7 || 0),
        leadership: (data.personality?.p6 || 0),
        agreeableness: (data.personality?.p5 || 0),
        extroversion: (data.personality?.p1 || 0),
        openness: (data.personality?.p3 || 0),
        emotional_stability: (data.personality?.p4 || 0),
        conscientiousness: (data.personality?.p2 || 0),
        math: (data.academics?.a1 || 0),
        science: (data.academics?.a2 || 0),
        languages: (data.academics?.a3 || 0),
        social: (data.academics?.a4 || 0),
        computer: (data.academics?.a5 || 0),
        arts: (data.academics?.a6 || 0)
      };

      // Calculate match score
      Object.keys(career.requiredTraits).forEach(trait => {
        const required = career.requiredTraits[trait];
        const userScore = userProfile[trait] || 0;
        maxScore += required;
        
        // Calculate how close the user's score is to the requirement
        const difference = Math.abs(required - userScore);
        if (difference === 0) {
          score += required;
        } else if (difference <= 1) {
          score += required * 0.8;
        } else if (difference <= 2) {
          score += required * 0.5;
        } else {
          score += required * 0.2;
        }
      });

      const matchPercentage = Math.round((score / maxScore) * 100);

      return {
        ...career,
        matchPercentage,
        matchScore: score
      };
    });

    // Sort by match percentage and return top matches
    return matchedCareers.sort((a, b) => b.matchPercentage - a.matchPercentage).slice(0, 6);
  };

  const calculateSkillsProfile = (data) => {
    return [
      { skill: 'Problem Solving', value: data.skills?.s1 || 0, fullMark: 5 },
      { skill: 'Creativity', value: data.skills?.s2 || 0, fullMark: 5 },
      { skill: 'Communication', value: data.skills?.s3 || 0, fullMark: 5 },
      { skill: 'Mathematics', value: data.skills?.s4 || 0, fullMark: 5 },
      { skill: 'Technical', value: data.skills?.s5 || 0, fullMark: 5 },
      { skill: 'Organization', value: data.skills?.s7 || 0, fullMark: 5 }
    ];
  };

  const getLearningPath = (career) => {
    const learningPaths = {
      'Software Engineer': [
        'Learn a programming language (Python, JavaScript, or Java)',
        'Study data structures and algorithms',
        'Build projects and contribute to open source',
        'Learn web development frameworks',
        'Get certified (AWS, Azure, or similar)'
      ],
      'Data Scientist': [
        'Master statistics and mathematics',
        'Learn Python and R programming',
        'Study machine learning and AI',
        'Work with real datasets',
        'Get certified in data science'
      ],
      'UX/UI Designer': [
        'Learn design principles and theory',
        'Master design tools (Figma, Adobe XD)',
        'Study user psychology',
        'Build a strong portfolio',
        'Learn basic HTML/CSS'
      ],
      'Business Analyst': [
        'Learn business analytics tools',
        'Study SQL and data visualization',
        'Understand business processes',
        'Get certified (CBAP or similar)',
        'Develop communication skills'
      ],
      'Healthcare Professional': [
        'Complete required pre-medical courses',
        'Get relevant certifications',
        'Volunteer in healthcare settings',
        'Study anatomy and physiology',
        'Attend medical school or nursing program'
      ]
    };

    return learningPaths[career] || [
      'Research educational requirements',
      'Gain relevant certifications',
      'Build practical experience',
      'Network with professionals',
      'Continue learning and developing skills'
    ];
  };

  if (loading) {
    return (
      <div className="result-container loading">
        <h2>Analyzing Your Results...</h2>
      </div>
    );
  }

  const topCareer = careerMatches[0];

  return (
    <ChakraProvider>
      <div className="result-container">
        <div className="result-header">
          <h1>Your Career Assessment Results</h1>
          <p>Based on your personality, skills, interests, and academic performance</p>
          <button className="download-button" onClick={() => window.print()}>
            <FaDownload /> Download Report
          </button>
        </div>

        {/* Top Career Match Card */}
        <div className="top-match-card">
          <div className="match-badge">
            <FaStar /> Top Match
          </div>
          <h2>{topCareer.name}</h2>
          <div className="match-percentage">
            <div className="percentage-circle">
              <span className="percentage-value">{topCareer.matchPercentage}%</span>
              <span className="percentage-label">Match</span>
            </div>
          </div>
          <p className="career-description">{topCareer.description}</p>
          
          <div className="career-details-grid">
            <div className="detail-item">
              <FaBriefcase className="detail-icon" />
              <div>
                <span className="detail-label">Salary Range</span>
                <span className="detail-value">{topCareer.salary}</span>
              </div>
            </div>
            <div className="detail-item">
              <FaChartLine className="detail-icon" />
              <div>
                <span className="detail-label">Job Growth</span>
                <span className="detail-value">{topCareer.growth}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Profile Radar Chart */}
        <div className="chart-section">
          <h2><FaStar /> Your Skills Profile</h2>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={skillsProfile}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" />
              <PolarRadiusAxis angle={90} domain={[0, 5]} />
              <Radar name="Your Skills" dataKey="value" stroke="#667eea" fill="#667eea" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* All Career Matches */}
        <div className="career-matches-section">
          <h2><FaBriefcase /> Career Matches</h2>
          <div className="careers-grid">
            {careerMatches.map((career, index) => (
              <div key={index} className="career-card">
                <div className="career-card-header">
                  <h3>{career.name}</h3>
                  <span className="career-field">{career.field}</span>
                </div>
                <Box className="match-progress">
                  <Progress value={career.matchPercentage} colorScheme="purple" height="8px" borderRadius="10px" />
                  <span className="match-text">{career.matchPercentage}% Match</span>
                </Box>
                <p className="career-card-description">{career.description}</p>
                <div className="career-card-footer">
                  <span className="salary-info">{career.salary}</span>
                  <span className="growth-info">{career.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Path */}
        <div className="learning-path-section">
          <h2><FaGraduationCap /> Recommended Learning Path for {topCareer.name}</h2>
          <div className="learning-path-steps">
            {getLearningPath(topCareer.name).map((step, index) => (
              <div key={index} className="learning-step">
                <div className="step-number">{index + 1}</div>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="action-btn primary" onClick={() => navigate('/dashboard')}>
            <FaChartLine /> View Dashboard
          </button>
          <button className="action-btn secondary" onClick={() => navigate('/test')}>
            <FaBook /> Retake Assessment
          </button>
        </div>
      </div>
    </ChakraProvider>
  );
}

export default Result;
