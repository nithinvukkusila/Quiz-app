import { useNavigate, useLocation } from "react-router-dom";
const Report = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userResponses, totalQuestions } = location.state;
  console.log(userResponses)
  const calculateScore = () => {
    let score = 0;
    userResponses.forEach((response) => {
      if (response.isCorrect) {
        score++;
      }
    });
    return score;
  };

  const calculatePercentage = (score, totalQuestions) => {
    return ((score / totalQuestions) * 100).toFixed(2);
  };

  const totalScore = calculateScore();
  const correctAnswers = totalScore;
  const incorrectAnswers = totalQuestions - correctAnswers;
  const percentage = calculatePercentage(totalScore, totalQuestions);

  const startAgain = () => {
    navigate("/");
  };

  return (
    <div className="quiz-report">
      <h1>Quiz Report</h1>
      <div className="card">
        {" "}
        <p className="card-score">Total Score:</p> 
        <p> {totalScore || 0}</p>{" "}
      </div>
      <div className="card"> <p className="card-score">Correct Answers:</p> <p>{correctAnswers || 0}</p> </div>
      <div className="card"> <p className="card-score">Incorrect Answers:</p> <p>{incorrectAnswers || 0}</p>  </div>
      <div className="card"> <p className="card-score">Percentage:</p>  <p>{percentage || 0}%</p> </div>
      <button className="primary-btn" onClick={startAgain}>
        Start Again
      </button>
    </div>
  );
};

export default Report;
