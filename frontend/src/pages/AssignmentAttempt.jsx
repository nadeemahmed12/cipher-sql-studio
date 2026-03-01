import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api.js";
import { useNavigate } from "react-router-dom";

import QuestionPanel from "../components/QuestionPanel";
import SampleDataViewer from "../components/SampleDataViewer";
import SqlEditor from "../components/SqlEditor";
import ResultPanel from "../components/ResultPanel";
import HintBox from "../components/HintBox";

function AssignmentAttempt() {
  const { id } = useParams();

  const [assignment, setAssignment] = useState(null);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/${id}`)
      .then((res) => setAssignment(res.data.assignment))
      .catch((err) => console.log(err));
  }, [id]);

  const handleExecute = async () => {
    try {
      setErrorMessage(""); // reset previous error

      const res = await API.post(`/${id}/execute`, { query });

      setResult(res.data.userResult);
      setIsCorrect(res.data.correct);
    } catch (err) {
      setIsCorrect(null);
      setResult([]);

      if (err.response?.data?.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("Invalid SQL query.");
      }
    }
  };

  if (!assignment) return <p>Loading...</p>;

  return (
    <div className="assignment-attempt">
      <button 
  className="back-btn"
  onClick={() => navigate("/")}
>
  Back to Assignments
</button>
      <div className="assignment-layout">
        <div className="left-panel">
          <QuestionPanel
            title={assignment.title}
            question={assignment.question}
          />

          <SampleDataViewer tables={assignment.sampleTables} />
        </div>

        <div className="right-panel">
          <SqlEditor query={query} setQuery={setQuery} />

          <button onClick={handleExecute}>Execute Query</button>

          {errorMessage && <p className="sql-error">{errorMessage}</p>}

          <HintBox id={id} query={query} />

          <ResultPanel result={result} isCorrect={isCorrect} />
        </div>
      </div>
    </div>
  );
}

export default AssignmentAttempt;
