import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Question from "./views/Question";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/question" element={<Question/>} />
      </Routes>
    </div>
  );
}

export default App;
