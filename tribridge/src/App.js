import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios'

function App() {

  const [docEmail, setDoctEmail] = useState('');
  const [patfname, setPatfname] = useState('');
  const [patLname, setPatLname] = useState('');

  const [patemail, setpatemail] = useState('');


  // for select
  const [sePatID, setsePatID] = useState('');
  const [sePatRow, setsePatRow]  = useState([]);

  const selectPatient = (patID) => {
    Axios.get('http://localhost:3002/api/get', {
      patID: patID,
    }).then((response) => {
      setsePatRow(response.data)
    })
  };

  // for updates
  const [upPatfname, setupPatfname] = useState('');
  const [upPatLname, setupPatLname] = useState('');
  const [upPatID, setupPatID] = useState('');
  const [upPatNewEmail, setupPatNewEmail] = useState('');

  const updatePatient = (patID, patNewEmail) => {
    Axios.put(`http://localhost:3002/api/update`, {
      patNewEmail: patNewEmail,
      patID: patID
    });
    selectPatient(patID)
  };


  // for delete
  const [delPatID, setdelPatID] = useState('');
  const deletePatient = (patID) => {
    Axios.delete(`http://localhost:3002/api/delete`, {
      patID: patID
    });
    selectPatient(patID)
  };

  // const deleteReview = (movieName) => {
  //   Axios.delete(`http://localhost:3002/api/delete/${movieName}`);
  // };

  return (
    <div className="App">
      <h1>Tribrdige DB demo</h1>
      <div className="form">
        <label>Patient Name: </label>
        <input type="text" name="movieName"/>

        <button>Submit</button>
      </div>

      <div className = "card">
        <h2>Reflecting Patient</h2>
        <ol id="listView">
        <li>ID: {sePatRow.PatID}</li>
        <li>First Name: {sePatRow.Fname}</li>
        <li>Last Name: {sePatRow.Lname}</li>
        <li>Email: {sePatRow.Email}</li>
        </ol>
      </div>

      <div className = "card">
        <h1> SELECT Patient:  </h1>
        <p>id:</p>
        <input type="text" id="patSelectInput" onChange={(e) => {
                setsePatID(e.target.value)
        } }/>

        <button onClick={() => {
                selectPatient(sePatID)
        }}> SELECT</button>


      </div>


      <div className = "card">
        <h1> Update Patient:  </h1>
        <p>id:</p>
        <input type="text" id="patSelectInput" onChange={(e) => {
                setupPatID(e.target.value)
        } }/>
        <p>new email:</p>
        <input type="text" id="patSelectInput" onChange={(e) => {
                setupPatNewEmail(e.target.value)
        } }/>

        <button onClick={() => {
                updatePatient(upPatID,upPatNewEmail)
        }}> Update</button>
      </div>

      <div className = "card">
        <h1> Delete Patient:  </h1>
        <p>id:</p>
        <input type="text" id="patSelectInput" onChange={(e) => {
                setdelPatID(e.target.value)
        } }/>

        <button onClick={() => {
                deletePatient(delPatID)
        }}> delete</button>

      </div>

    </div>

    
  );
}

export default App;
