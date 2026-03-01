function QuestionPanel({ title, question }) {
  return (
    <div className="question-panel">
      <h2>{title}</h2>
      <p>{question}</p>
    </div>
  );
}

export default QuestionPanel;