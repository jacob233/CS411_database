const express = require("express")
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

var db = mysql.createConnection({ //need to confirm this part
    host:'35.192.126.71',
    port:'3306',
    user:'root',
    password:"C411projS",
    database:"tribridge" 
})


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

db.connect(function(err) {
    if (err) throw err;
  });

app.post("/api/insert", (require, response) => {
    // const tableName = require.body.tableName;
    const Fname = require.body.docfname;
    const Lname = require.body.docLname;
    const Affi = require.body.docAffil;
    const Email = require.body.docEmail;///tbd


    const sqlInsert = "INSERT INTO Doctors (Fname, Lname, Affiliation, Email) VALUES (?,?,?,?)";
    db.query(sqlInsert, [Fname, Lname, Affi, Email], (err, result) => {
        console.log(result)
        //response.send(result.affectedRows)
    })
});

app.post("/api/search", (require, response) => {
    // const tableName = require.body.tableName;
    // const attr = require.body.attr;
    const value = require.body.patID;
    console.log(value)
    //response.send(require);


    const sqlSelect = "SELECT * FROM Patients WHERE PatientID = ?";
    db.query(sqlSelect, [value], (err, result) => {
        response.send(result);
    });
});


app.put("/api/update/", (require, response) => {
    // const tableName = require.body.tableName;
    // const attr = require.body.attr;
    const patientID = require.body.patID;
    // const attrChange = require.body.attrChange;
    const patNewEmail = require.body.patNewEmail;
    console.log(require.body)
    const sqlUpdate = "UPDATE Patients SET Email = ? WHERE PatientID= ?";
    db.query(sqlUpdate, [patNewEmail, patientID], (err, result) => {
        if (err) 
        console.log(err);
        response.send(result);
    })
});

app.post("/api/delete", (require, response) => {
    // const tableName = require.body.tableName;
    // const attr = require.body.attr;
    const value = require.body.patID;
    console.log(value)
    const sqlDelete = "DELETE FROM Patients WHERE PatientID = ?";
    db.query(sqlDelete, value, (err, result) => {
        if (err) 
        console.log(err);
        response.send('1');
    })
});
// advanced SQL queries


// Check how many patients total each medical company have 
app.get("/api/totalPatients", (require, response) => {
    // const tableName = require.body.tableName;
    // const attr = require.body.attr;
    // const value = require.body.value;

    const sqlSelect = "SELECT m.MedCompanyName AS name, temp.mid, temp.pnum \
    FROM Medical_companies m \
        JOIN(SELECT t.MedCompanyID AS mid, COUNT(DISTINCT r.PatientID) AS pnum \
                FROM  Trials t JOIN Reports r ON t.TrialID = r.TrialID \
                GROUP BY t.MedCompanyID) temp ON m.MedCompanyID = temp.mid \
    ORDER BY name, temp.mid";
    db.query(sqlSelect, (err, result) => {
        response.send(result);
    });
});

// Count number of reports in each company generated before 'some time'like '2021-03-11 02:06:23'
app.post("/api/reportsPerCompany", (require, response) => {
    const date = require.body.date;
    console.log(date)
    const sqlSelect = "SELECT mc.MedCompanyName, count(r.ReportID)  \
    FROM Medical_companies mc \
    JOIN Trials t ON mc.MedCompanyID = t.MedCompanyID \
    JOIN Reports r ON t.TrialID = r.TrialID\
    WHERE r.Date < ?\
    GROUP BY mc.MedCompanyName";
    db.query(sqlSelect,date, (err, result) => {
        response.send(result);
    });
});




app.listen(3002, () => {
    console.log("running on port 3002");
})