import React from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../api/service";

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
    <div>
      <h1>Uprised</h1>
      <p>quiz</p>
      <button onClick={startQuiz}>Start</button>
    </div>
  );
};

export default Home;
