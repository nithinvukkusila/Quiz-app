import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const Question = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const questions = location.state
    const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0);
    const [selectedChoice, setSelectedChoice] = useState("");
    const [timer, setTimer] = useState(0)
    const [userResponses, setUserResponses] = useState([]);

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
           
            await fetch("http://localhost:4000/submit-response", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  questionId: question.id,
                  selectedChoice,
                  timeTaken,
                }),
              });
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
      <div className="current-question">{currentQuestionIndex + 1}/{questions.length}</div>
      <h2>{questions[currentQuestionIndex].text}</h2>
      
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
      <button  className="primary-btn next-btn" onClick={submitResponse}>
        {currentQuestionIndex + 1 === questions.length ? "Finish" : "Next"}
      </button>
      <p>Time taken: {timer} seconds</p>
    </div>
   )
}

export default Question