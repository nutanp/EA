'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const hdb = require('hdb');
const async = require('async');
let hanaClient = require(path.resolve('./config/hanaclient'));

router.get('/test', (req, res) => {
  res.send(200);
});

router.post('/get_quest', (req, res) => {

  let savkey=req.body.savkey;
  
  let output;
  if(hanaClient.client2.readyState==='connected'){
    return hanaClient.client2.prepare('call ccma_get_sav_quest(?, ?)', (err, statement) => {
      if (err) {
        //hanaClient.disconnect();
        return console.error('Prepare error:', err);
      }
      return statement.exec([savkey], (err, parameters, rows) => {
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
      'Error': 'Hana State error '+hanaClient.client2.readyState
    });
  }
  
  });

router.post('/save/qanda', (req, res) => {
  // let savkey = req.body.savkey;
  var paramArr = [];
  var questionArr = [];
  questionArr = req.body;
  var modifiedRecordArr = [];
  questionArr.forEach(function(questionObj) {
    var paramArr = [];
    paramArr.push(questionObj.SAV_KEY,questionObj.Q_VAR, questionObj.Q_VAL, questionObj.ANS_VAR,
      questionObj.ANS_VAL);
    modifiedRecordArr.push(paramArr);
  });



  let output;


if (hanaClient.client2.readyState === 'connected') {
  return hanaClient.client2.prepare('call SAVE_QUESTIONNAIRE(CCMA_SAV_QUESTIONNAIRE_TEMP)', (err, statement) => {
    if (err) {
      //hanaClient.disconnect();
      console.error('Prepare error:' + err);
      return res.jsonp({
        'Error': 'Prepare failed'
      });
    }
    return updateProspectRefTemporaryTable(modifiedRecordArr, (err) => {
      if (err) {
        //hanaClient.disconnect();
        console.error('Prepare Temp data error:', err);
        return res.jsonp({
          'Error': 'Prepare Temp Data failed'
        });
      }
      return statement.exec([], (err, parameters, rows, tableRows) => {
        //hanaClient.disconnect();
        if (err) {
          console.error('Execute error:', err);
          return res.jsonp({
            'Error': 'execution failed'
          });
        }
        return res.json({
          messsage: 'success'
        });
      });
    });

  });
}
else{
  return res.jsonp({
    'Error': 'Hana State error '+hanaClient.readyState
  });
}

function updateProspectRefTemporaryTable(values, cb) {
function truncate(cb) {
  var sql = 'truncate table  CCMA_SAV_QUESTIONNAIRE_TEMP';
  hanaClient.client2.exec(sql, function(err) {
    cb(err);
  });
}


function prepare(cb) {
  var sql = 'insert into CCMA_SAV_QUESTIONNAIRE_TEMP values(?, ?, ?, ?, ?)';
  hanaClient.client2.prepare(sql, cb);
}

function insertValues(statement, cb) {
  function createTasks(value) {
    return statement.exec.bind(statement, [value[0], value[1], value[2], value[3], value[4]]);
  }

  async.series(values.map(createTasks), function() {
    // ignore error
    statement.drop(cb);
  });
}
async.waterfall([truncate, prepare, insertValues], cb);
}



});
module.exports = router;