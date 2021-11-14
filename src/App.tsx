import React from "react";
import ShowCards from "./Components/ShowCards";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header role="heading" aria-level={1} className="App-header">
        <p>Memory Game</p>
      </header>
      <div className="cards">
        <ShowCards />
      </div>
    </div>
  );
}

export default App;
