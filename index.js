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

      let levelOfStudents = "";
      let englishTypes = "";
      let designTypes = "";
      
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

      if(requestData.levelOfStudents)
      {
        let requestLevelOfStudents = requestData.levelOfStudents.replace(/\s+/g, '').split(',');
        if(requestLevelOfStudents && requestLevelOfStudents.length > 0)
        {
          levelOfStudents = requestLevelOfStudents.join('|');
        }
      }

      if(requestData.englishType)
      {
        let requestEnglishTypes = requestData.englishType.replace(/\s+/g, '').split(',');
        if(requestEnglishTypes && requestEnglishTypes.length > 0)
        {
          englishTypes = requestEnglishTypes.join('|');
        }
      }

      if(requestData.designType)
      {
        let requestDesignTypes = requestData.designType.replace(/\s+/g, '').split(',');
        if(requestDesignTypes && requestDesignTypes.length > 0)
        {
          designTypes = requestDesignTypes.join('|');
        }
      }

      
      let object = {
        category: categories,
        cities: cities,
        levelOfStudents: levelOfStudents,
        englishType: englishTypes,
        designType: designTypes,
        isTutor: PerformerHelper.isTutor(categoryArray),
        isDesigner: PerformerHelper.isDesigner(categoryArray),
        isPhotographer: PerformerHelper.isPhotographer(categoryArray)
      };

      res.send(object);
    }
  }
})

app.post('/getRelevantTutors', async (req, res) => {

  const connection2 = await mysql2.createConnection(process.env.DATABASE_URL);

  let result = {
    isNeedToSendOrderToPerformers: false
  };

  if(!req.body) res.send(result);

  let requestData = req.body.request;

  if(!requestData) res.send(result);

  let clientEnglishLevelInOrder = requestData.clientEnglishLevel;
  let enlishTypeInOrder = requestData.englishType;

  let [tutors, fields] = await connection2.query(`select * from performer where service_category like '%Guru Bahasa Inggris%' and is_active = 1`);
  if(!tutors || tutors.length == 0) res.send(result);

  if(clientEnglishLevelInOrder !== OrderHelper.ALL_LEVELS_OF_ENGLISH) {

    let filteredTutorsByLevelOfEnglish = [];
    for(let i = 0; i < tutors.length; i++) {
      if(tutors[i].client_english_leavel && tutors[i].client_english_leavel.includes(clientEnglishLevelInOrder)) {
        filteredTutorsByLevelOfEnglish.push(tutors[i]);
      }
    }

    tutors = filteredTutorsByLevelOfEnglish;
  }

  if(enlishTypeInOrder !== OrderHelper.ALL_ENGLISH_TYPE) {

    let filteredTutorsByEnglishType = [];
    for(let i = 0; i < tutors.length; i++) {
      if(tutors[i].english_type && tutors[i].english_type.includes(enlishTypeInOrder)) {
        filteredTutorsByEnglishType.push(tutors[i]);
      }
    }

    tutors = filteredTutorsByEnglishType;

  }

  result.phones = tutors.filter(x => x.phone && x.phone !== '').map(_ => _.phone).join(',');
  result.isNeedToSendOrderToPerformers = true;

  res.send(result);

})


app.post('/getRelevantDesigners', async (req, res) => {

  const connection2 = await mysql2.createConnection(process.env.DATABASE_URL);

  let result = {
    isNeedToSendOrderToPerformers: false
  };

  if(!req.body) res.send(result);

  let requestData = req.body.request;

  if(!requestData) res.send(result);

  let designTypeInOrder = requestData.designType;

  let [designers, fields] = await connection2.query(`select * from performer where service_category like '%Desainer%' and is_active = 1`);
  if(!designers || designers.length == 0) res.send(result);

  if(designTypeInOrder !== OrderHelper.ALL_DESING_TYPE) {

    let filteredDesignersByDesignType = [];
    for(let i = 0; i < designers.length; i++) {
      if(designers[i].design_type && designers[i].design_type.includes(designTypeInOrder)) {
        filteredDesignersByDesignType.push(designers[i]);
      }
    }

    designers = filteredDesignersByDesignType;

  }

  result.phones = designers.filter(x => x.phone && x.phone !== '').map(_ => _.phone).join(',');
  result.isNeedToSendOrderToPerformers = true;

  res.send(result);
  

})


app.post('/getInfoForAdConversion', async (req, res) => {
  
  const connection2 = await mysql2.createConnection(process.env.DATABASE_URL);
  
  let result = {
    isNeedToSendConversion : false
  };

  if(!req.body) res.send(result);

  let requestData = req.body.request;
  if(!requestData.id) res.send(result);
  
  let [rows, fields] = await connection2.query(`select * from request where id = \"${requestData.id}\"`);
  if(!rows || rows.length == 0) res.send(result);

  let currentOrder = rows[0];
  console.log(currentOrder);
  let currentStatus = currentOrder.status;
  let currentAdUrl = currentOrder.refferal_url;
  let createdDate = currentOrder.created_date;
  let email = currentOrder.client_email;
  let phone = currentOrder.client_phone;

  let orderAmount = (requestData.finalPrice && requestData.finalPrice !== "") ? requestData.finalPrice : requestData.advancePrice;
  let parsedUrl = OrderHelper.parseOrderAdUrl(currentAdUrl);


  result = {
    isNeedToSendConversion: OrderHelper.isNeedToSendAdEvent(currentStatus),
    adType: parsedUrl.adType,
    adClickId: parsedUrl.adClickId,
    eventName: OrderHelper.getAdEventName(currentStatus, parsedUrl.adType),
    amount: orderAmount,
    currentDateTime: new Date(),
    cretedOrderUnixTime: new Date(createdDate).getTime(),
    clientEmail:  email,
    clientPhone: OrderHelper.clearPhoneNumber(phone)
  }

  res.send(result);

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
