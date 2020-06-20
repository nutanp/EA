'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const hdb = require('hdb');
const hanaClient = require(path.resolve('./config/hanaclient'));


/* GET api listing. */
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

module.exports = router;
