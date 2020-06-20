'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const hdb = require('hdb');
const config = require(path.resolve('./config/config'));
const hanaClient = require(path.resolve('./config/hanaclient'));
/* GET api listing.*/


/* GET api listing.*/
router.post('/definition', (req, res) => {
  let prospectrefid=req.body.prospectrefid;

  let output;
  if(hanaClient.readyState==='connected'){
    return hanaClient.prepare('call EA_Get_Customer_Def_v2(?, ?)', (err, statement) => {
      if (err) {
        //hanaClient.disconnect();
        return console.error('Prepare error:', err);
      }
      return statement.exec([prospectrefid], (err, parameters, rows) => {
        //hanaClient.disconnect();
        if (err) {
          return console.error('Execute error:', err);
        }
        output=rows;
        return res.json(output);
      });
    });
  }
  else{
    return res.jsonp({
      'Error': 'Hana State error '+hanaClient.readyState
    });
  }

});

router.post('/save/definition', (req, res) => {
  let customer=req.body.customer;

  let inputArr = [customer.prospectrefid, customer.prospectrefname, customer.crguname,
    customer.crguid, customer.addtcrguid, customer.addtcrhqid, customer.installsitecrpartyid, customer.addtinstallsiteid,
    customer.createddate, customer.updateddate, customer.createdby, customer.updatedby, customer.bulkguuploadid
  ];

  let output;

  if(hanaClient.readyState==='connected'){
    hanaClient.prepare('call ea_Save_Customer_def_v3(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', (err, statement) => {
      if (err) {
        //hanaClient.disconnect();
        return console.error('Prepare error:', err);
      }
      statement.exec(inputArr, (err, parameters, rows) => {
        //hanaClient.disconnect();
        if (err) {
          return console.error('Execute error:', err);
        }
        return res.json({ messsage:'success' });
      });
    });
  }
  else{
    return res.jsonp({
      'Error': 'Hana State error '+hanaClient.readyState
    });
  }

});

module.exports = router;
