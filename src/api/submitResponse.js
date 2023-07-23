const submitResponse = (req, res) => {
    const { questionId, selectedChoice, timeTaken } = req.body;
    const db = require("./db.json");
  
    // Find the question by id
    const question = db.questions.find((q) => q.id === questionId);
  
    if (!question) {
      return res.status(404).json({ error: "Question not found." });
    }
  
    // Check if the selected choice is correct
    const isCorrect = question.correctAnswer === selectedChoice;
  
    // Store the user response in the userResponses array
    db.userResponses.push({
      questionId,
      selectedChoice,
      timeTaken,
      isCorrect,
    });
  
    // Update the db.json file with the new user response
    const fs = require("fs");
    fs.writeFileSync("db.json", JSON.stringify(db, null, 2));
  
    res.status(200).json({ message: "Response submitted successfully." });
  };
  
  module.exports = submitResponse;
  