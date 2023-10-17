require('dotenv').config();
const express = require('express')
var bodyParser = require('body-parser');
const { PerformerHelper } = require('./performerHelper');
const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const mysql = require('mysql2');
const { OrderHelper } = require('./orderHelper');
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


app.post('/updateOrderStatusInfo', (req, res) => {

  if(req.body) {
    let requestData = req.body.request;
    if(requestData.id)
    {
      let newOrderStatusId = requestData.status;
      let orderAmount = 0;
      if(requestData.finalOrderAmount)
      {
        orderAmount = requestData.finalOrderAmount;
      }
      let newOrderStatus = OrderHelper.getOrderStatusById(newOrderStatusId);
    

      let object = {
        status : OrderHelper.getOrderStatusNameById(newOrderStatusId) 
      };

      if(newOrderStatus && newOrderStatus > 0)
      {
        console.log(11);
        //1.1 Получаем объект заказа из БД по ID
        connection.query(`select * from request where id = \"${requestData.id}\"`, function(err, rows, fields) {
          if(err) 
          {
            console.log(err);
            throw err;
          }
          console.log(rows)
          if(rows && rows.length > 0)
          {
            console.log(22);

            let currentOrder = rows[0];
            let oldStatus = currentOrder.status;
            if(oldStatus == newOrderStatus)
            {
              console.log(33);

              //Обновить только request
              connection.query(`update request set amount = ${orderAmount} where id = \"${requestData.id}\"`, function(err1, rows1, fields1) {
                if(err1) throw err1;
              
              });

            }
            else {

              console.log(4);

              //Обновить request and request_status_history
              connection.query(`update request set amount = ${orderAmount}, status = ${newOrderStatus} where id = \"${requestData.id}\"`, function(err1, rows1, fields1) {
                if(err1) throw err1;
              
                connection.query(`insert into request_status_history (request_id, datetime, status) values(\"${requestData.id}\", UTC_TIMESTAMP(), ${newOrderStatus})`, function(err2, row2, fields2) {
                  if(err2) throw err2;
                })
              });

              if(!OrderHelper.isNeedUpdateOnlyStatus(newOrderStatusId)) {
                
                //Обновить performer interaction with request 
                if(newOrderStatusId == OrderHelper.DISCUSSION_OF_TERMS_STATUS)
                {
                  let performersString = requestData.performersForDiscussing;
                  if(performersString)
                  {
                    let performersArray = performersString.replace(/\s+/g, '').split(',');
                    if(performersArray && performersArray.length > 0)
                    {
                      for(let i = 0; i < performersArray.length; i++)
                      {
                        connection.query(`insert into performer_interaction_with_request (request_id, performer_id, datetime, action) values(\"${requestData.id}\", \"${performersArray[i]}\", UTC_TIMESTAMP(), 2)`, function(err3, rows3, fields3) {
                          if(err3) throw err3;
                        });
                      }
                    }
                  }
                }
                else if(newOrderStatusId == OrderHelper.CLIENT_CHOICE_PERFORMER_STATUS) 
                {
                  let performersString = requestData.whoFulfillOrder;
                  if(performersString)
                  {
                    let performersArray = performersString.replace(/\s+/g, '').split(',');
                    if(performersArray && performersArray.length > 0)
                    {
                      for(let i = 0; i < performersArray.length; i++)
                      {
                        connection.query(`insert into performer_interaction_with_request (request_id, performer_id, datetime, action) values(\"${requestData.id}\", \"${performersArray[i]}\", UTC_TIMESTAMP(), 3)`, function(err3, rows3, fields3) {
                          if(err3) throw err3;
                        });
                      }
                    }
                  }
                }
              }
            }
          }
        });
      }

      res.send(object);
    }
  }
})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// Export the Express API
module.exports = app;
