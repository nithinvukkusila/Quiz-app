import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useMemo, useState } from "react";

const Question = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const questions = location.state;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState("");
  const [timer, setTimer] = useState(0);
  const [userResponses, setUserResponses] = useState([]);

  const timerRef = useRef(null);
  const handleChoiceChange = (e) => {
    setSelectedChoice(e.target.value);
  };

  const submitResponse = async () => {
    try {
      if (!selectedChoice) {
        alert("Please select an option");
        return;
      }
      clearTimeout(timerRef.current);
      setTimer(0);

      const question = questions[currentQuestionIndex];
      const timeTaken = question.timeout - timer;
      const response = {
        questionId: question.id,
        selectedChoice,
        timeTaken,
        isCorrect: selectedChoice === question.correctAnswer,
      };
      setUserResponses((prevResponses) => [...prevResponses, response]);

      await fetch(`${process.env.REACT_APP_API_BASE_URL}/submit-response`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(response),
      });
      if (currentQuestionIndex + 1 === questions.length) {
        console.log(response)
      } else {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        selectedChoice("");
      }
    } catch (error) {
      console.error("Error Submitting response: ", error);
    }
  };
  const startTimer = () => {
    setTimer(0);
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
  };

  const renderQuestionImage = useMemo(() => {
    const currentQuestion = questions[currentQuestionIndex];
    console.log(currentQuestion);
    if (currentQuestion.imageUrl) {
      return (
        <img
          className="optional-image"
          src={currentQuestion.imageUrl}
          alt="Question"
        />
      );
    }
    return null;
  }, [currentQuestionIndex, questions]);

  useEffect(() => {
    startTimer();
    return () => clearTimeout(timerRef.current);
  }, [currentQuestionIndex]);
  
  useEffect(() => {
    if(userResponses.length === questions.length) {
      navigate("/report", {
        state: {
          userResponses,
          totalQuestions: questions.length,
        },
      });
    }
  }, [userResponses, questions, navigate])

  return (
    <>
      <div className="question-container">
        <div className="current-question">
          {currentQuestionIndex + 1}/{questions.length}
        </div>
        <div className="header">
          <h2>{questions[currentQuestionIndex].text}</h2>
          {renderQuestionImage}
        </div>
        <form>
          {questions[currentQuestionIndex].choices.map((choice, index) => (
            <div key={index} className="radio-group">
              <input
                type="radio"
                name="choice"
                id={`choice${index}`}
                value={choice}
                onChange={handleChoiceChange}
                checked={selectedChoice === choice}
              />
              <label htmlFor={`choice${index}`}>{choice}</label>
            </div>
          ))}
        </form>
          <p>Time taken: {timer} seconds</p>
          <button className="primary-btn next-btn" onClick={submitResponse}>
            {currentQuestionIndex + 1 === questions.length ? "Finish" : "Next"}
          </button>
      </div>
    </>
  );
};

export default Question;
