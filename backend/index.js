const express = require("express")
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

var db = mysql.createConnection({ //need to confirm this part
    host:'35.192.26.71',
    user:'root',
    password:"123456",
    database:"tribridge" , 
})


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/insert", (require, response) => {
    const tableName = require.body.tableName;
    const IDEntryName = require.body.IDEntryName;
    const contentEntryName = require.body.contentEntryName;
    const ID = require.body.ID;
    const content = require.body.content;///tbd

    const sqlInsert = "INSERT INTO ? (?, ?) VALUES (?,?)";
    db.query(sqlInsert, [tableName, IDEntryName, contentEntryName, ID, content], (err, result) => {
        console.log(error);
    })
});

app.get("/api/search", (require, response) => {
    const tableName = require.body.tableName;
    const attr = require.body.attr;
    const value = require.body.value;

    const sqlSelect = "SELECT * FROM ? WHERE ? = ?";
    db.query(sqlSelect, [tableName, attr, value], (err, result) => {
        response.send(result);
    });
});

app.put("/api/update/", (require, response) => {
    // const tableName = require.body.tableName;
    // const attr = require.body.attr;
    const value = require.body.patientID;
    // const attrChange = require.body.attrChange;
    const valueChange = require.body.valueChange;

    const sqlUpdate = "UPDATE 'Patients' SET 'Email' = ? WHERE 'PatientID'= ?";
    db.query(sqlUpdate, [valueChange, patientID], (err, result) => {
        if (err) 
        console.log(error);
        response.send(result);
    })
});

app.delete("/api/delete/:movieName", (require, response) => {
    // const tableName = require.body.tableName;
    // const attr = require.body.attr;
    const value = require.body.value;
 
    const sqlDelete = "DELETE FROM 'Doctors' WHERE 'DoctorID' = ?";
    db.query(sqlDelete, [value], (err, result) => {
        if (err) 
        console.log(error);
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
app.get("/api/reportsPerCompany", (require, response) => {
    const date = require.body.date;


    const sqlSelect = "SELECT mc.MedCompanyName, count(r.ReportID)  \
    FROM Medical_companies mc \
    JOIN Trials t ON mc.MedCompanyID = t.MedCompanyID \
    JOIN Reports r ON t.TrialID = r.TrialID\
    WHERE r.Date < ?\
    GROUP BY mc.MedCompanyName";
    db.query(sqlSelect,[date], (err, result) => {
        response.send(result);
    });
});




app.listen(3002, () => {
    console.log("running on port 3002");
})