require('dotenv').config();
const express = require('express')
var bodyParser = require('body-parser');
const { PerformerHelper } = require('./performerHelper');
const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const mysql = require('mysql2');
const mysql2 = require('mysql2/promise');
const { OrderHelper } = require('./orderHelper');
//const connection = mysql.createConnection(process.env.DATABASE_URL);


app.post('/postData', (req, res) => {

  const connection = mysql.createConnection(process.env.DATABASE_URL);
  connection.connect();

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
  
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  connection.connect();
  
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


app.post('/updateOrderStatusInfo',  async (req, res) => {

  const connection2 = await mysql2.createConnection(process.env.DATABASE_URL);

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
        //1.1 Получаем объект заказа из БД по ID
        let [rows, fields] = await connection2.query(`select * from request where id = \"${requestData.id}\"`);
        if(rows && rows.length > 0)
        {
            let currentOrder = rows[0];
            let oldStatus = currentOrder.status;
            if(oldStatus == newOrderStatus)
            {
              await connection2.query(`update request set amount = ${orderAmount} where id = \"${requestData.id}\"`);
            }
            //Обновить request and request_status_history
            let promises = [];
            promises.push(connection2.query(`update request set amount = ${orderAmount}, status = ${newOrderStatus} where id = \"${requestData.id}\"`));
            promises.push(connection2.query(`insert into request_status_history (request_id, datetime, status) values(\"${requestData.id}\", UTC_TIMESTAMP(), ${newOrderStatus})`));
            await Promise.all(promises);

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
                    let performerPromises = [];
                    for(let i = 0; i < performersArray.length; i++)
                    {
                      performerPromises.push(connection2.query(`insert into performer_interaction_with_request (request_id, performer_id, datetime, action) values(\"${requestData.id}\", \"${performersArray[i]}\", UTC_TIMESTAMP(), 2)`));
                    }
                    await Promise.all(performerPromises);
                  }
                }
              }
              if(newOrderStatusId == OrderHelper.CLIENT_CHOICE_PERFORMER_STATUS) 
              {
                let performersString = requestData.whoFulfillOrder;
                if(performersString)
                {
                  let performersArray = performersString.replace(/\s+/g, '').split(',');
                  let promises = [];
                  if(performersArray && performersArray.length > 0)
                  {
                    let performerPromises = [];
                    for(let i = 0; i < performersArray.length; i++)
                    {
                      performerPromises.push(connection2.query(`insert into performer_interaction_with_request (request_id, performer_id, datetime, action) values(\"${requestData.id}\", \"${performersArray[i]}\", UTC_TIMESTAMP(), 3)`));
                    }
                    await Promise.all(performerPromises);
                  }
                }
              }
            }
        }
      }

      res.send(object);
      return;
    }
  }
})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// Export the Express API
module.exports = app;
