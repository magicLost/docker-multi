import React, { useEffect, useState } from "react";
import axios from "axios";

const fetchValues = async (setState) => {
  const values = await axios.get("/api/values/current");
  console.log("FETCH VALUES", values);
  setState((prevState) => ({ ...prevState, values: values.data }));
};

const fetchIndexes = async (setState) => {
  const seenIndexes = await axios.get("/api/values/all");
  console.log("FETCH INDEXES", seenIndexes);
  setState((prevState) => ({ ...prevState, seenIndexes: seenIndexes.data }));
};

const renderSeenIndexes = (state) => {
  console.log("RENDER SEEN INDEXES", state);
  const str = state.seenIndexes.map(({ number }) => number).join(", ");
  return <p>{str}</p>;
};

const renderValues = (state) => {
  const entries = [];

  for (let key in state.values) {
    entries.push(
      <div key={key}>
        For index {key} I calculated {state.values[key]}
      </div>
    );
  }

  return entries;
};

const Fib = () => {
  const [state, setState] = useState({
    seenIndexes: [],
    values: {},
    index: "",
  });

  useEffect(() => {
    fetchValues(setState);
    fetchIndexes(setState);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post("/api/values", {
      index: state.index,
    });
    setState((prevState) => ({ ...prevState, index: "" }));
  };

  console.log("RENDER FIB", state);

  return (
    <div style={{ paddingTop: "40px" }}>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input
          value={state.index}
          onChange={(event) =>
            setState({ ...state, index: event.target.value })
          }
        />
        <button>Submit</button>
      </form>

      <h4>Indexes I have seen:</h4>
      {renderSeenIndexes(state)}
      <h4>Calculated values:</h4>
      {renderValues(state)}
    </div>
  );
};

export default Fib;
