import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AssessmentTest.css';
import { FaCheckCircle, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

function AssessmentTest() {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState({
    personality: {},
    skills: {},
    interests: {},
    academics: {},
  });

  // Personality Questions (Big Five + Career-specific traits)
  const personalityQuestions = [
    { id: 'p1', question: 'I enjoy working in teams and collaborating with others', trait: 'extroversion' },
    { id: 'p2', question: 'I prefer detailed planning before starting any task', trait: 'conscientiousness' },
    { id: 'p3', question: 'I am comfortable with trying new approaches and taking risks', trait: 'openness' },
    { id: 'p4', question: 'I remain calm under pressure and handle stress well', trait: 'emotional_stability' },
    { id: 'p5', question: 'I enjoy helping others solve their problems', trait: 'agreeableness' },
    { id: 'p6', question: 'I like to lead projects and make important decisions', trait: 'leadership' },
    { id: 'p7', question: 'I enjoy analyzing data and finding patterns', trait: 'analytical' },
    { id: 'p8', question: 'I prefer structured tasks with clear guidelines', trait: 'structure_preference' },
  ];

  // Skills Assessment
  const skillsQuestions = [
    { id: 's1', question: 'Problem-solving and logical reasoning', category: 'cognitive' },
    { id: 's2', question: 'Creative thinking and innovation', category: 'creative' },
    { id: 's3', question: 'Communication and presentation skills', category: 'communication' },
    { id: 's4', question: 'Mathematical and quantitative abilities', category: 'quantitative' },
    { id: 's5', question: 'Technical and computer skills', category: 'technical' },
    { id: 's6', question: 'Attention to detail and accuracy', category: 'detail' },
    { id: 's7', question: 'Time management and organization', category: 'organization' },
    { id: 's8', question: 'Adaptability and learning new things', category: 'adaptability' },
  ];

  // Interest Areas
  const interestQuestions = [
    { id: 'i1', question: 'Technology and Computer Science', field: 'technology' },
    { id: 'i2', question: 'Business and Entrepreneurship', field: 'business' },
    { id: 'i3', question: 'Healthcare and Medicine', field: 'healthcare' },
    { id: 'i4', question: 'Arts and Design', field: 'arts' },
    { id: 'i5', question: 'Science and Research', field: 'science' },
    { id: 'i6', question: 'Education and Teaching', field: 'education' },
    { id: 'i7', question: 'Law and Public Service', field: 'law' },
    { id: 'i8', question: 'Engineering and Manufacturing', field: 'engineering' },
  ];

  // Academic Performance
  const academicQuestions = [
    { id: 'a1', question: 'Mathematics', subject: 'math' },
    { id: 'a2', question: 'Science (Physics, Chemistry, Biology)', subject: 'science' },
    { id: 'a3', question: 'English and Languages', subject: 'languages' },
    { id: 'a4', question: 'Social Studies and History', subject: 'social' },
    { id: 'a5', question: 'Computer Science/Programming', subject: 'computer' },
    { id: 'a6', question: 'Arts and Creative Subjects', subject: 'arts' },
  ];

  const sections = [
    { title: 'Personality Assessment', questions: personalityQuestions, type: 'personality', description: 'Rate how much you agree with each statement' },
    { title: 'Skills Evaluation', questions: skillsQuestions, type: 'skills', description: 'Rate your proficiency in each area' },
    { title: 'Interest Areas', questions: interestQuestions, type: 'interests', description: 'Rate your interest level in each field' },
    { title: 'Academic Performance', questions: academicQuestions, type: 'academics', description: 'Rate your performance in each subject' },
  ];

  const currentSectionData = sections[currentSection];

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [currentSectionData.type]: {
        ...prev[currentSectionData.type],
        [questionId]: value
      }
    }));
  };

  const isCurrentSectionComplete = () => {
    const currentAnswers = answers[currentSectionData.type];
    return currentSectionData.questions.every(q => currentAnswers[q.id] !== undefined);
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      // Save results to localStorage and navigate to results
      localStorage.setItem('careerAssessmentResults', JSON.stringify(answers));
      navigate('/result');
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const progress = ((currentSection + 1) / sections.length) * 100;

  return (
    <div className="assessment-container">
      <div className="assessment-header">
        <h1>Career Assessment Test</h1>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="progress-text">Section {currentSection + 1} of {sections.length}</p>
      </div>

      <div className="assessment-content">
        <div className="section-header">
          <h2>{currentSectionData.title}</h2>
          <p className="section-description">{currentSectionData.description}</p>
        </div>

        <div className="questions-container">
          {currentSectionData.questions.map((question, index) => (
            <div key={question.id} className="question-card">
              <div className="question-header">
                <span className="question-number">{index + 1}</span>
                <p className="question-text">{question.question}</p>
                {answers[currentSectionData.type][question.id] && (
                  <FaCheckCircle className="check-icon" />
                )}
              </div>
              
              <div className="rating-scale">
                {[1, 2, 3, 4, 5].map(value => (
                  <button
                    key={value}
                    className={`rating-button ${answers[currentSectionData.type][question.id] === value ? 'selected' : ''}`}
                    onClick={() => handleAnswer(question.id, value)}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <div className="rating-labels">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          ))}
        </div>

        <div className="navigation-buttons">
          <button 
            className="nav-button prev-button" 
            onClick={handlePrevious}
            disabled={currentSection === 0}
          >
            <FaArrowLeft /> Previous
          </button>
          
          <button 
            className={`nav-button next-button ${!isCurrentSectionComplete() ? 'disabled' : ''}`}
            onClick={handleNext}
            disabled={!isCurrentSectionComplete()}
          >
            {currentSection === sections.length - 1 ? 'Get Results' : 'Next'} <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssessmentTest;
