const Button = () => {
  return (
    <button className="primary-btn next-btn" onClick={submitResponse}>
      {currentQuestionIndex + 1 === questions.length ? "Finish" : "Next"}
    </button>
  );
};

export default Button