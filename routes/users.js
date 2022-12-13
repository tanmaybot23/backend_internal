var express = require('express');
//const client = require('../db');
var router = express.Router();
//var db = require("../db");
//import {qry} from '../db'
const {Client} = require('pg');
const cors = require('cors');
const app = express();
app.use(cors())
app.use(cors({origin: 'http://localhost:4200'}));
// Add headers


const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "userData"
})

client.connect()
var qry;
client.query(`select * from temp_use`, (err, result) => {
    if(!err){
        qry = result.rows;
        console.log(qry);
    }
    client.end();
})
//const newq = JSON.parse('qry');
/* GET users listing. */
router.get('/', function(req, res, next) {
  

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();

  res.send(qry);
});
    
module.exports = router;
