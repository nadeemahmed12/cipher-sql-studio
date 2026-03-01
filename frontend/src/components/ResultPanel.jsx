function ResultPanel({ result, isCorrect }) {

  // Agar abhi execute nahi hua
  if (isCorrect === null) return null;

  return (
    <div className="result-panel">

      {/* Correct / Incorrect Message */}
      <p className={isCorrect ? "success" : "error"}>
  {isCorrect ? "Correct ✅" : "Incorrect ❌"}
</p>

      {/* Agar rows aaye hain */}
      {result && result.length > 0 ? (
        <div className="result-table">
          <table>
            <thead>
              <tr>
                {Object.keys(result[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((val, i) => (
                    <td key={i}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No rows returned</p>
      )}
    </div>
  );
}

export default ResultPanel;