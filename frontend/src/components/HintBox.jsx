import { useState, useEffect } from "react";
import API from "../services/api";

function HintBox({ id, query }) {
  const [hint, setHint] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setHint("");
  }, [query]);
  const getHint = async () => {
    try {
      setLoading(true);
      const res = await API.post(`/${id}/hint`, { query });
      setHint(res.data.hint);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hint-box">
      <button onClick={getHint} disabled={loading}>
        {loading ? "Getting Hint..." : "Get Hint"}
      </button>

      {hint && <p className="hint-text">{hint}</p>}
    </div>
  );
}

export default HintBox;
