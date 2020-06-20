'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const hdb = require('hdb');
const config = require(path.resolve('./config/config'));
let hanaClient = require(path.resolve('./config/hanaclient'));

hanaClient = hanaClient.client1;
/* GET api listing.*/
router.post('/validateuser', (req, res) => {
  var state= hanaClient.readyState;
  console.log('Hana connection state '+state);
  var loggedInUser;

  if (req.headers.auth_user){
    loggedInUser=req.headers.auth_user;
  }
  else{
    loggedInUser=config.dummyUser;
  }

  if(state==='connected'){
    return res.jsonp({ loggedInUser:loggedInUser, 'message': 'valid connection' });
  }
  else{
    hanaClient.connect((err) => {
      if (err) {
      	return console.error('Connect error', err);
      }
      console.log('connected to hana');
      return res.jsonp({ loggedInUser:loggedInUser, 'message': 'valid connection' });
    });
  }
});

module.exports = router;
