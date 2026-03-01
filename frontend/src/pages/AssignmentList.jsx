import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api.js";

function AssignmentList() {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/")
      .then((res) => setAssignments(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="assignment-list">
      <h1>SQL Assignments</h1>

      {assignments.map((item) => (
        <div key={item._id} className="assignment-card">
          <h3>{item.title}</h3>
          <p>{item.question}</p>
          <div className="card-actions">
            <span className={`difficulty ${item.difficulty.toLowerCase()}`}>
              {item.difficulty}
            </span>

            <button onClick={() => navigate(`/assignment/${item._id}`)}>
              Start
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AssignmentList;
