require('dotenv').config();
const express = require('express')
var bodyParser = require('body-parser');
const { PerformerHelper } = require('./performerHelper');
const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const mysql = require('mysql2');
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

app.post('/getPerformerObject', (req, res) => {
  if(req.body) {
    let requestData = req.body.request;

    if(requestData) {

      let categories = "";
      let categoryArray = [];

      let cities = "";
      let cityArray = [];
      
      if(requestData.cities)
      {
        let requestCities = requestData.cities.replace(/\s+/g, '').split(',');
        if(requestCities && requestCities.length > 0)
        {
          for(let i = 0; i < requestCities.length; i++)
          {
            let city = PerformerHelper.getCityNameById(requestCities[i]);
            if(city)
            {
              cityArray.push(city);
            }
          }
          cities = cityArray.join('|');
          }
      }

      if(requestData.categories)
      {

        let requestCategories = requestData.categories.replace(/\s+/g, '').split(',');
        if(requestCategories && requestCategories.length > 0)
        {
          for(let i = 0; i < requestCategories.length; i++)
          {
            let category = PerformerHelper.getCategoryNameById(requestCategories[i])
            if(category) {
              categoryArray.push(category);
            }
          }
          categories = categoryArray.join('|');
        }  

        
      }
      
      let object = {
        category: categories,
        cities: cities,
        isTutor: PerformerHelper.isTutor(categoryArray),
        isDesigner: PerformerHelper.isDesigner(categoryArray),
        isPhotographer: PerformerHelper.isPhotographer(categoryArray)
      };

      res.send(object);
    }
  }
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// Export the Express API
module.exports = app;
