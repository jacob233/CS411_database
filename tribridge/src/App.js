import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios'

function App() {
  const [hasError, sethasError] = useState(false);


  // for insert
  const [docfname, setDocfname] = useState('');
  const [docLname, setDocLname] = useState('');
  const [docAffil, setDocAffil] = useState('');
  const [docEmail, setDoctEmail] = useState('');


  const insertPatient = (docfname, docLname, docAffil, docEmail) => { 
    Axios.post('http://localhost:3002/api/insert', {
      docfname: docfname,
      docLname: docLname,
      docAffil, docAffil,
      docEmail, docEmail
    }).then((response) => {
      setsePatRow(response.data)
    })
  };

  // for select
  const [sePatID, setsePatID] = useState('');
  const [sePatRow, setsePatRow]  = useState([]);

  // const selectPatient = (patID) => {
  //   Axios.get(`http://localhost:3002/api/search/${patID}`);
  //   // .then((response) => {
  //   //   // if (response.data != 1){
  //   //   //   sethasError(true)
  //   //   // }
  //   //   setsePatRow(response.data)
  //   // })
  // };

  const selectPatient = (patID) => {
    Axios.post('http://localhost:3002/api/search', {
      patID: patID,
    })
    .then((response) => {
      if (response.data == []){
        setsePatRow(response.data[0])
      }
     
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
    Axios.post(`http://localhost:3002/api/delete`, {
      patID: patID
    });
    //selectPatient(patID)
  };

  // const deleteReview = (movieName) => {
  //   Axios.delete(`http://localhost:3002/api/delete/${movieName}`);
  // };


  // advance query 1
  const [patPerCompany, setpatPerCompany] = useState([]);


  // useEffect(() => {
  //   Axios.get('http://localhost:3002/api/totalPatients').then((response) => {
  //     console.log(response.data)
  //     setpatPerCompany(response.data)
  //   })
  // },[])
  

  return (
    <div className="App">
      {/* <p>{patPerCompany}</p> */}
      <h1>Tribrdige DB demo</h1>
      <div className="form">
        <label>Patient Name: </label>
        <input type="text" name="movieName"/>

        <button>Submit</button>
      </div>

      <div className = "card">
        <h1> INSERT doctor:  </h1>
        <p>doctor first name:</p>
        <input type="text" id="patSelectInput" onChange={(e) => {
                setDocfname(e.target.value)
        } }/>
        <p>doctor last name:</p>
        <input type="text" id="patSelectInput" onChange={(e) => {
                setDocLname(e.target.value)
        } }/>
        <p>doctor Affiliation:</p>
        <input type="text" id="patSelectInput" onChange={(e) => {
                setDocAffil(e.target.value)
        } }/>
        <p>doctor Email:</p>
        <input type="text" id="patSelectInput" onChange={(e) => {
                setDoctEmail(e.target.value)
        } }/>
        <button onClick={() => {
                insertPatient(docfname, docLname, docAffil, docEmail)
        }}> INSERT</button>
      </div>

      <div className = "card">
        <h2>Reflecting Patient</h2>
        <ol id="listView">
        <li>ID: {sePatRow.PatientID}</li>
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
                console.log("sePatID: ", sePatID)
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
