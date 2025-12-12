import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChakraProvider, Progress, Box } from "@chakra-ui/react";
import { FaTrophy, FaChartLine, FaBookOpen, FaBullseye, FaRegLightbulb, FaClock } from 'react-icons/fa';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = useCallback(() => {
    // Load assessment results
    const assessmentData = localStorage.getItem('careerAssessmentResults');
    
    // Load or initialize progress tracking
    const progressData = localStorage.getItem('learningProgress');
    const parsedProgress = progressData ? JSON.parse(progressData) : initializeProgress();

    // Load assessment history
    const historyData = localStorage.getItem('assessmentHistory');
    const parsedHistory = historyData ? JSON.parse(historyData) : [];

    setDashboardData({
      assessment: assessmentData ? JSON.parse(assessmentData) : null,
      progress: parsedProgress,
      history: parsedHistory
    });
    
    setLoading(false);
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const initializeProgress = () => {
    return {
      completedCourses: 0,
      totalCourses: 12,
      studyHours: 0,
      weeklyGoal: 10,
      skillsInProgress: [
        { name: 'Programming', progress: 0 },
        { name: 'Communication', progress: 0 },
        { name: 'Problem Solving', progress: 0 },
        { name: 'Leadership', progress: 0 }
      ],
      achievements: [],
      weeklyActivity: [
        { day: 'Mon', hours: 0 },
        { day: 'Tue', hours: 0 },
        { day: 'Wed', hours: 0 },
        { day: 'Thu', hours: 0 },
        { day: 'Fri', hours: 0 },
        { day: 'Sat', hours: 0 },
        { day: 'Sun', hours: 0 }
      ]
    };
  };

  const calculateOverallProgress = () => {
    if (!dashboardData?.progress) return 0;
    const { completedCourses, totalCourses } = dashboardData.progress;
    return Math.round((completedCourses / totalCourses) * 100);
  };

  const getCareerGoal = () => {
    const topCareer = localStorage.getItem('topCareerMatch');
    return topCareer || 'Software Engineer';
  };

  const achievements = [
    { id: 1, title: 'First Assessment', icon: '🎯', unlocked: true, description: 'Completed your first career assessment' },
    { id: 2, title: 'Goal Setter', icon: '🎖️', unlocked: true, description: 'Set your career goals' },
    { id: 3, title: 'Week Warrior', icon: '🔥', unlocked: false, description: 'Study 10 hours in one week' },
    { id: 4, title: 'Skill Master', icon: '🏆', unlocked: false, description: 'Complete 5 courses' },
    { id: 5, title: 'Consistent Learner', icon: '⭐', unlocked: false, description: 'Study 7 days in a row' },
    { id: 6, title: 'Career Ready', icon: '🚀', unlocked: false, description: 'Complete all recommended courses' }
  ];

  const recommendedResources = [
    {
      title: 'Introduction to Programming',
      platform: 'Coursera',
      duration: '4 weeks',
      difficulty: 'Beginner',
      link: '#'
    },
    {
      title: 'Data Structures & Algorithms',
      platform: 'Udemy',
      duration: '8 weeks',
      difficulty: 'Intermediate',
      link: '#'
    },
    {
      title: 'Web Development Bootcamp',
      platform: 'freeCodeCamp',
      duration: '12 weeks',
      difficulty: 'Beginner',
      link: '#'
    },
    {
      title: 'Soft Skills for Success',
      platform: 'LinkedIn Learning',
      duration: '2 weeks',
      difficulty: 'All Levels',
      link: '#'
    }
  ];

  if (loading) {
    return (
      <div className="dashboard-container loading">
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  if (!dashboardData?.assessment) {
    return (
      <div className="dashboard-container no-data">
        <div className="no-data-card">
          <FaChartLine className="no-data-icon" />
          <h2>No Assessment Data Found</h2>
          <p>Take the career assessment to unlock your personalized dashboard</p>
          <button className="cta-button" onClick={() => navigate('/test')}>
            Take Assessment
          </button>
        </div>
      </div>
    );
  }

  const overallProgress = calculateOverallProgress();
  const careerGoal = getCareerGoal();

  return (
    <ChakraProvider>
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-content">
            <h1>Your Learning Dashboard</h1>
            <p>Track your progress towards becoming a {careerGoal}</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <FaBullseye />
            </div>
            <div className="stat-content">
              <h3>Overall Progress</h3>
              <p className="stat-value">{overallProgress}%</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
              <FaBookOpen />
            </div>
            <div className="stat-content">
              <h3>Courses Completed</h3>
              <p className="stat-value">{dashboardData.progress.completedCourses}/{dashboardData.progress.totalCourses}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
              <FaClock />
            </div>
            <div className="stat-content">
              <h3>Study Hours</h3>
              <p className="stat-value">{dashboardData.progress.studyHours}h</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
              <FaTrophy />
            </div>
            <div className="stat-content">
              <h3>Achievements</h3>
              <p className="stat-value">{achievements.filter(a => a.unlocked).length}/{achievements.length}</p>
            </div>
          </div>
        </div>

        {/* Skills in Progress */}
        <div className="section-card">
          <h2><FaRegLightbulb /> Skills Development</h2>
          <div className="skills-progress-container">
            {dashboardData.progress.skillsInProgress.map((skill, index) => (
              <div key={index} className="skill-progress-item">
                <div className="skill-progress-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.progress}%</span>
                </div>
                <Box>
                  <Progress 
                    value={skill.progress} 
                    colorScheme="purple" 
                    height="10px" 
                    borderRadius="10px" 
                  />
                </Box>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Activity Chart */}
        <div className="section-card">
          <h2><FaChartLine /> Weekly Activity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardData.progress.weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="hours" 
                stroke="#667eea" 
                strokeWidth={3}
                name="Study Hours"
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="weekly-goal">
            <p>Weekly Goal: {dashboardData.progress.studyHours}/{dashboardData.progress.weeklyGoal} hours</p>
            <Box>
              <Progress 
                value={(dashboardData.progress.studyHours / dashboardData.progress.weeklyGoal) * 100} 
                colorScheme="green" 
                height="8px" 
                borderRadius="10px" 
              />
            </Box>
          </div>
        </div>

        {/* Achievements */}
        <div className="section-card">
          <h2><FaTrophy /> Achievements</h2>
          <div className="achievements-grid">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
              >
                <div className="achievement-icon">{achievement.icon}</div>
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
                {achievement.unlocked && <div className="unlocked-badge">Unlocked!</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Resources */}
        <div className="section-card">
          <h2><FaBookOpen /> Recommended Learning Resources</h2>
          <div className="resources-grid">
            {recommendedResources.map((resource, index) => (
              <div key={index} className="resource-card">
                <h3>{resource.title}</h3>
                <div className="resource-details">
                  <span className="resource-platform">{resource.platform}</span>
                  <span className="resource-duration">{resource.duration}</span>
                </div>
                <span className={`resource-difficulty ${resource.difficulty.toLowerCase().replace(' ', '-')}`}>
                  {resource.difficulty}
                </span>
                <button className="resource-button">
                  Start Learning
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="dashboard-actions">
          <button className="action-button primary" onClick={() => navigate('/result')}>
            <FaBullseye /> View Career Report
          </button>
          <button className="action-button secondary" onClick={() => navigate('/test')}>
            <FaChartLine /> Retake Assessment
          </button>
        </div>
      </div>
    </ChakraProvider>
  );
}

export default Dashboard;
