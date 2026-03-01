import { Routes, Route } from "react-router-dom";
import AssignmentList from "./pages/AssignmentList";
import AssignmentAttempt from "./pages/AssignmentAttempt";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AssignmentList />} />
      <Route path="/assignment/:id" element={<AssignmentAttempt />} />
    </Routes>
  );
}

export default App;