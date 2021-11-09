const express = require("express")
const app = express();
const mysql = require("mysql");

var db = mysql.createConnection({ //need to confirm this part
    host:'35.192.26.71',
    user:'root',
    password:"123456",
    database:"tribridge" , 
})