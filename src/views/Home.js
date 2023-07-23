import React from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../api/apiService";

const Home = () => {
  const navigate = useNavigate();
  const startQuiz = async () => {
    try {
      const response = await apiService.get("/questions");
        const questions = response.data;
      navigate("/question", { state: questions });
    } catch (error) {
      console.error("Error starting the quiz", error);
    }
  };
  return (
    <div className="home">
      <h1>Uprised</h1>
      <p>Quiz</p>
      <button className="primary-btn" onClick={startQuiz}>Start</button>
    </div>
  );
};

export default Home;
