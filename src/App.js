import { useEffect, useReducer } from "react";
import "./App.css";
import DateCounter from "./DateCounter";
import Header from "./Header";
import Main from "./Main";

const initialState = {
  questions: [],

  // loading, error, ready, active, finished
  status: "loading",
};

function reducer(state, action) {
  // console.log(state);
  console.log(action);
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    case "dataFailed": return {
      ...state,
      status: "error",
    };

    default:
      throw new Error("something wrong");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { questions, status } = state;

  useEffect(function () {
    fetch(`http://localhost:8000/questions`).then((res) =>
      res
        .json()
        .then((data) => dispatch({type: "dataRecieved", payload: data }))
        .catch((err) => dispatch({type: "dataFailed", payload: err }))
    );
  }, []);
  return (
    <div className="app">
      <Header />
      <Main className="main">
        <p> Question 1 /15 </p>
        <p> question ?</p>
      </Main>
    </div>
  );
}

export default App;
