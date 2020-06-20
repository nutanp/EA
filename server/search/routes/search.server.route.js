'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const hdb = require('hdb');
let hanaClient = require(path.resolve('./config/hanaclient'));

hanaClient = hanaClient.client1;
/* GET api listing. */

/*GET search Count by irfan */
router.get('/customerSearchCount', function(req, res, next) {

  var input = req.query.customer;
    
    if(hanaClient.readyState==='connected'){
    return hanaClient.prepare('call EA_GET_CUSTOMER_COUNT_v1(?, ?)', (err, statement) => {
   
      if (err) {
 
        console.error('Prepare error:'+ err);
        return res.jsonp({ 'Error': 'Prepare failed' });
      }
      return statement.exec([input], (err, parameters, rows, tableRows) => {
     
        if (err) {
          console.error('Execute error:', err);
          return res.jsonp({ 'Error': 'execution failed' });
        }
    
        return res.json({result : rows[0]['CUSTOMER COUNT']});
      });
    });
  }
    else{
      return res.jsonp({
        'Error': 'Hana State error '+hanaClient.readyState
      });
    }
  });

/* get search data by irfan*/

router.get('/customerSearchData', function(req, res, next) {

  var customer = req.query.customer;
  var searchParty = req.query.searchParty;
  let output;
  console.log("searchParty",searchParty,"customer",customer);
    if(searchParty === 'GU' || searchParty === 'HQ' || searchParty === 'IS'){
      console.log(customer);
    if(hanaClient.readyState==='connected'){
    return hanaClient.prepare('call EA_GET_CUSTOMER_DETAIL_V1(?, ?, ?)', (err, statement) => {

      if (err) {

        console.error('Prepare error:'+ err);
        return res.jsonp({ 'Error': 'Prepare failed' });
      }
      return statement.exec([customer, searchParty], (err, parameters, rows, tableRows) => {
   
        if (err) {
          console.error('Execute error:', err);
          return res.jsonp({ 'Error': 'execution failed' });
        }
        
        return res.json(rows);
      });
    });
  }

    else{
      return res.jsonp({
        'Error': 'Hana State error '+hanaClient.readyState
      });
    }
  }
  else{
    return res.jsonp({ 'Error': 'Not a valid search param '+customer });
  }
  });

router.post('/search', (req, res) => {
  let searchparam=req.body.searchparam;
  let searchval=req.body.searchvalue;
  let output;
  if(searchparam==='installsitecrpartyid' || searchparam==='installsitecrpartyname' || searchparam==='crgupartyid' ||
    searchparam==='crgupartyname' ||searchparam==='crparentpartyid' || searchparam==='crparentpartyname' ||
		searchparam==='crparentpartyid' || searchparam==='crparentpartyname' ||	searchparam==='installsiteid' ||
			searchparam==='installsitename'){
      if(hanaClient.readyState==='connected'){
        return hanaClient.prepare('call GET_ADDT_CUST_INFO(?, ?, ?)', (err, statement) => {
          if (err) {
            //hanaClient.disconnect();
            console.error('Prepare error:'+ err);
            return res.jsonp({ 'Error': 'Prepare failed' });
          }
          return statement.exec([searchparam, searchval], (err, parameters, rows, tableRows) => {
            //hanaClient.disconnect();
            if (err) {
              console.error('Execute error:', err);
              return res.jsonp({ 'Error': 'execution failed' });
            }
            //hanaClient.disconnect();
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

  }
  else{
    return res.jsonp({ 'Error': 'Not a valid search param '+searchparam });
  }
});

router.post('/searchForSecurrity', (req, res) => {
  let searchparam=req.body.searchparam;
  let searchval=req.body.searchvalue;
  let output;
  if(searchparam==='installsitecrpartyid' || searchparam==='installsitecrpartyname' || searchparam==='crgupartyid' ||
    searchparam==='crgupartyname' ||searchparam==='crparentpartyid' || searchparam==='crparentpartyname' ||
		searchparam==='crparentpartyid' || searchparam==='crparentpartyname' ||	searchparam==='installsiteid' ||
			searchparam==='installsitename'){
      if(hanaClient.readyState==='connected'){
        return hanaClient.prepare('call EA_SEC_GET_ADDT_CUST_INFO(?, ?, ?)', (err, statement) => {
          if (err) {
            //hanaClient.disconnect();
            console.error('Prepare error:'+ err);
            return res.jsonp({ 'Error': 'Prepare failed' });
          }
          return statement.exec([searchparam, searchval], (err, parameters, rows, tableRows) => {
            // console.log('tablerows: ', tableRows);
            //hanaClient.disconnect();
            if (err) {
              console.error('Execute error:', err);
              return res.jsonp({ 'Error': 'execution failed' });
            }
            //hanaClient.disconnect();
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

  }
  else{
    return res.jsonp({ 'Error': 'Not a valid search param '+searchparam });
  }
  
  router.get('/searchme', function(req, res){
    console.log(req.query.name);
    res.send(name);
  });
});

module.exports = router;