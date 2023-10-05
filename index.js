require('dotenv').config();
const express = require('express')
var bodyParser = require('body-parser');
const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.connect()

app.post('/postData', (req, res) => {

  if(req.body) {
    let requestData = req.body.request;
    if(requestData) {
      connection.query(requestData, function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
      })
    }
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// Export the Express API
module.exports = app;
