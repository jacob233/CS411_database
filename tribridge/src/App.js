import './App.css';
import React, {useSate, useEffect} from "react";
import Axios from 'axios'

function App() {
  return (
    <div className="App">
      <h1>Tribrdige Stuff</h1>
      <div className="form">
        <label>Patient Name: </label>
        <input type="text" name="movieName"/>

        <button>Submit</button>
      </div>
    </div>
  );
}

export default App;
