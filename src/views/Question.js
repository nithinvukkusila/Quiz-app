import { useNavigate, useLocation } from "react-router-dom";
import apiService from "../api/service";
import { useEffect, useRef, useState } from "react";

const Question = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const questions = location.state
    const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0);
    const [selectedChoice, setSelectedChoice] = useState("");
    const [timer, setTimer] = useState(0)

    const timerRef = useRef(null)
    const handleChoiceChange = (e) => {
        setSelectedChoice(e.target.value)
    }
   
    const submitResponse = async () => {
        try {
            if(!selectedChoice) {
                alert("Please select an option")
                return
            }
            clearTimeout(timerRef.current);
            setTimer(0);

            const question = questions[currentQuestionIndex]
            const timeTaken = question.timeout - timer;

            await apiService.post("/submit-response", {
                questionId: question.id,
                selectedChoice,
                timeTaken
            })
            if(currentQuestionIndex + 1 === questions.length) {
                navigate('/report')
            }else {
                setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                selectedChoice("")
            } 
        } catch (error) {
            console.error("Error Submitting response: ", error)
        }
    };
    const startTimer = () => {
        setTimer(0);
        timerRef.current = setInterval(() => {
            setTimer((prevTimer) => prevTimer + 1)
        }, 1000)
    }
    useEffect(() => {
      startTimer();
      return () => clearTimeout(timerRef.current)
    }, [currentQuestionIndex])
   return (
    <div>
      <h1>Question 1</h1>
      <h2>{questions[currentQuestionIndex].text}</h2>
      <form>
        {questions[currentQuestionIndex].choices.map((choice, index) => (
          <div key={index}>
            <input
              type="radio"
              name="choice"
              value={choice}
              onChange={handleChoiceChange}
              checked={selectedChoice === choice}
            />
            <label>{choice}</label>
          </div>
        ))}
      </form>
      <button onClick={submitResponse}>
        {currentQuestionIndex + 1 === questions.length ? "Finish" : "Next"}
      </button>
      <p>Time taken: {timer} seconds</p>
    </div>
   )
}

export default Question