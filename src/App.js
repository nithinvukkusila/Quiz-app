import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Question from "./views/Question";
import Report from "./views/Report";
function App() {
  return (
    <div className="App">
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/question" element={<Question />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
