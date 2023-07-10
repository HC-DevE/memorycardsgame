import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MemoryGame from "./MemoryGame";

function App() {
  return (
    <div className="container">
      {/* <h1>Memory Game</h1> */}
      <MemoryGame />
    </div>
  );
}

export default App;
