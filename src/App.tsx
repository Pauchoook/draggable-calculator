import React from "react";
import "./app.scss";
import Body from "./components/Body";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="app">
      <div className="app__wrapper">
        <Nav />
        <Body />
      </div>
    </div>
  );
}

export default App;
