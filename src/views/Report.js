import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Report = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { questions, totalScore, correctAnswers } = {};
  const totalQuestions = 0;

  const incorrectAnswers = totalQuestions - correctAnswers;

  useEffect(() => {
    fetch("http://localhost:4000/submit-response")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.data);
      });
  }, []);

  const startAgain = () => {
    navigate("/");
  };

  const calculatePercentage = (score, totalQuestions) => {
    return ((score / totalQuestions) * 100).toFixed(2);
  };
  const percentage = calculatePercentage(totalScore, totalQuestions);

  return (
    <div>
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
