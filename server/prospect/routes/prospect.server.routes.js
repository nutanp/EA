'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const hdb = require('hdb');
const async = require('async');
const moment = require('moment');
const config = require(path.resolve('./config/config'));
let hanaClient = require(path.resolve('./config/hanaclient'));

hanaClient = hanaClient.client1;
/* GET api listing.*/
router.post('/create', (req, res) => {
  let offername = req.body.offername;
  let prospectrefname = req.body.prospectrefname;
  let guname = req.body.guname;
  let guids = req.body.guids;
  let hierarchylevel = req.body.hierarchylevel;
  let createdBy = req.body.createdBy;  
  let query = '';

  let output;

  if (hanaClient.readyState === 'connected') {
    return hanaClient.prepare('call ea_Create_Prospect_Id_v2(?, ?, ?, ?, ?, ?, ?)', (err, statement) => {
      if (err) {
        //hanaClient.disconnect();
        console.error('Prepare error:', err);
        return res.jsonp({
          'Error': 'Prepare failed'
        });
      }
      return statement.exec([offername, prospectrefname, guname, guids, hierarchylevel, createdBy], (err, parameters, rows, tableRows) => {
        //hanaClient.disconnect();
        if (err) {
          console.error('Execute error:', err);
          return res.jsonp({
            'Error': 'execution failed'
          });
        }
        output = rows;
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

router.post('/search/pretcv/bycrguname', (req, res) => {
  let crguname = req.body.crguname;

  let output;

  if (hanaClient.readyState === 'connected') {
    return hanaClient.prepare('call Search_Prospect_By_CRGUNAME_pretcv(?, ?)', (err, statement) => {
      if (err) {
        //hanaClient.disconnect();
        console.error('Prepare error:' + err);
        return res.jsonp({
          'Error': 'Prepare failed'
        });
      }
      return statement.exec([crguname], (err, parameters, rows, tableRows) => {
        //hanaClient.disconnect();
        if (err) {
          console.error('Execute error:', err);
          return res.jsonp({
            'Error': 'execution failed'
          });
        }
        output = rows;
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

router.post('/fetch/pretcv/guidsbycrguname', (req, res) => {
  let crguname = req.body.crguname;
  let hierarchylevel = req.body.hierarchylevel;

  let output;
  if (hanaClient.readyState === 'connected') {
    return hanaClient.prepare('call ea_get_gu_hq_name_V1(?, ?, ?)', (err, statement) => {
      if (err) {
        //hanaClient.disconnect();
        console.error('Prepare error:' + err);
        return res.jsonp({
          'Error': 'Prepare failed'
        });
      }
      return statement.exec([crguname,hierarchylevel], (err, parameters, rows, tableRows) => {
        //hanaClient.disconnect();
        if (err) {
          console.error('Execute error:', err);
          return res.jsonp({
            'Error': 'execution failed'
          });
        }
        output = rows;
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

router.post('/search/byid', (req, res) => {
  let prospectid = req.body.prospectid;

  let output;

  if (hanaClient.readyState === 'connected') {
    return hanaClient.prepare('call Search_Prospect_ById_V1(?, ?)', (err, statement) => {
      if (err) {
        //hanaClient.disconnect();
        console.error('Prepare error:' + err);
        return res.jsonp({
          'Error': 'Prepare failed'
        });
      }
      return statement.exec([prospectid], (err, parameters, rows, tableRows) => {
        //hanaClient.disconnect();
        if (err) {
          console.error('Execute error:', err);
          return res.jsonp({
            'Error': 'execution failed'
          });
        }
        output = rows;
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

router.post('/search/byname', (req, res) => {
  let prospectname = req.body.prospectname;
  let output;

  if (hanaClient.readyState === 'connected') {
    return hanaClient.prepare('call Search_Prospect_Byname(?, ?)', (err, statement) => {
      if (err) {
        //hanaClient.disconnect();
        console.error('Prepare error:' + err);
        return res.jsonp({
          'Error': 'Prepare failed'
        });
      }
      return statement.exec([prospectname], (err, parameters, rows, tableRows) => {
        //hanaClient.disconnect();
        if (err) {
          console.error('Execute error:', err);
          return res.jsonp({
            'Error': 'execution failed'
          });
        }
        output = rows;
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

router.post('/search/bycrguid', (req, res) => {
  let crguid = req.body.crguid;
  let output;

  if (hanaClient.readyState === 'connected') {
    return hanaClient.prepare('call Search_Prospect_By_CRGUID(?, ?)', (err, statement) => {
      if (err) {
        //hanaClient.disconnect();
        console.error('Prepare error:' + err);
        return res.jsonp({
          'Error': 'Prepare failed'
        });
      }
      return statement.exec([crguid], (err, parameters, rows, tableRows) => {
        //hanaClient.disconnect();
        if (err) {
          console.error('Execute error:', err);
          return res.jsonp({
            'Error': 'execution failed'
          });
        }
        output = rows;
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

router.post('/search/bycrguname', (req, res) => {
  let crguname = req.body.crguname;
  let output;

  if (hanaClient.readyState === 'connected') {
    return hanaClient.prepare('call Search_Prospect_By_CRGUNAME(?, ?)', (err, statement) => {
      if (err) {
        //hanaClient.disconnect();
        console.error('Prepare error:' + err);
        return res.jsonp({
          'Error': 'Prepare failed'
        });
      }
      return statement.exec([crguname], (err, parameters, rows, tableRows) => {
        //hanaClient.disconnect();
        if (err) {
          console.error('Execute error:', err);
          return res.jsonp({
            'Error': 'execution failed'
          });
        }
        output = rows;
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

router.post('/save/suiteinfo', (req, res) => {
  let prospectrefid = req.body.prospectrefid;
  let growthparam = req.body.growthparam;
  let createdBy = req.body.createdBy;
  let updatedBy = req.body.updatedBy;

  let output;

  if (hanaClient.readyState === 'connected') {
    return hanaClient.prepare('call SAVE_SUITE_INFO(?, ?, ?, ?)', (err, statement) => {
      if (err) {
        //hanaClient.disconnect();
        console.error('Prepare error:' + err);
        return res.jsonp({
          'Error': 'Prepare failed'
        });
      }
      return statement.exec([prospectrefid, growthparam, createdBy, updatedBy], (err, parameters, rows, tableRows) => {
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
  }
  else{
    return res.jsonp({
      'Error': 'Hana State error '+hanaClient.readyState
    });
  }

});


router.post('/save/prospectrefname',(req,res) => {
	let prospectrefname = req.body.prospectrefname;
	let prospectrefid = req.body.prospectrefid;
	
	let output;
	
	if (hanaClient.readyState === 'connected') {
    return hanaClient.prepare('call EA_SAVE_PROSPECT_REF_NAME(?, ?, ?)', (err, statement) => {
      if (err) {
        console.error('Prepare error:' + err);
        return res.jsonp({
          'Error': 'Prepare failed'
        });
      }
      return statement.exec([prospectrefid, prospectrefname], (err, parameters, rows, tableRows) => {
        //hanaClient.disconnect();
        if (err) {
          console.error('Execute error:', err);
          return res.jsonp({
            'Error': 'execution failed'
          });
        }
        output = parameters;
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

router.post('/fetch/suiteinfo', (req, res) => {
  let prospectrefid = req.body.prospectrefid;

  let output;

  if (hanaClient.readyState === 'connected') {
    return hanaClient.prepare('call GET_SUITE_INFO_v2(?, ?)', (err, statement) => {
      if (err) {
        console.error('Prepare error:' + err);
        return res.jsonp({
          'Error': 'Prepare failed'
        });
      }
      return statement.exec([prospectrefid], (err, parameters, rows, tableRows) => {
        //hanaClient.disconnect();
        if (err) {
          console.error('Execute error:', err);
          return res.jsonp({
            'Error': 'execution failed'
          });
        }
        output = parameters;
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

router.post('/fetch/defaultparam', (req, res) => {
  let offerid = req.body.offerid;

  let output;

  if (hanaClient.readyState === 'connected') {
    return hanaClient.prepare('call get_default_param_V3(?, ?)', (err, statement) => {
      if (err) {
        //hanaClient.disconnect();
        console.error('Prepare error:' + err);
        return res.jsonp({
          'Error': 'Prepare failed'
        });
      }
      return statement.exec([offerid], (err, parameters, rows, tableRows) => {
        //hanaClient.disconnect();
        if (err) {
          console.error('Execute error:', err);
          return res.jsonp({
            'Error': 'execution failed'
          });
        }
        output = rows;
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

router.post('/fetch/growthparam', (req, res) => {
  let prospectrefid = req.body.prospectrefid;

  let output;

  if (hanaClient.readyState === 'connected') {
    return hanaClient.prepare('call Get_Growth_Param_v6(?, ?)', (err, statement) => {
      if (err) {
        //hanaClient.disconnect();
        console.error('Prepare error:' + err);
        return res.jsonp({
          'Error': 'Prepare failed'
        });
      }
      return statement.exec([prospectrefid], (err, parameters, rows, tableRows) => {
        //hanaClient.disconnect();
        if (err) {
          console.error('Execute error:', err);
          return res.jsonp({
            'Error': 'execution failed'
          });
        }
        output = rows;
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


router.post('/save/growthparam', (req, res) => {
  let growthParam = req.body.growthParam;

  var paramArr = [];
  paramArr = [growthParam.prospectRefId || null,
    growthParam.term || null,
    growthParam.paymentMethod || null,
    growthParam.elaStarDate || null,
    growthParam.hwRefreshDate || null,
    growthParam.countryOfTransaction || null,
    growthParam.accessSwitchingHWDisc || null,
    growthParam.accessWirelessHWDisc || null,
    growthParam.dataCenterNetworkingHWDisc || null,
    growthParam.wanHWDisc || null,
    growthParam.accessSwitchingHWServDisc || null,
    growthParam.accessWirelessHWServDisc || null,
    growthParam.dataCenterNetworkingHWServDisc || null,
    growthParam.wanHWServDisc || null,
    growthParam.accessSwitchingSWDisc || null,
    growthParam.accessWirelessSWDisc || null,
    growthParam.dataCenterNetworkingSWDisc || null,
    growthParam.wanSWDisc || null,
    growthParam.accessSwitchingSWSSDisc || null,
    growthParam.accessWirelessSWSSDisc || null,
    growthParam.dataCenterNetworkingSWSSDisc || null,
    growthParam.wanSWSSDisc || null,
    growthParam.accessSwitchingAdvDep || null,
    growthParam.accessWirelessAdvDep || null,
    growthParam.dataCenterNetworkingAdvDep || null,
    growthParam.wanAdvDep || null,
    growthParam.accessSwitchingGrowthRate || null,
    growthParam.accessWirelessGrowthRate || null,
    growthParam.dataCenterNetworkingGrowthRate || null,
    growthParam.wanGrowthRate || null,
	growthParam.advantageSwitchingSubsDisc || null,
	growthParam.advantageSwitchingGrowthRate || null,
	growthParam.advantageSwitchingHWDisc || null,
	growthParam.advantageSwitchingHWServDisc || null,
	growthParam.advantageWirelessSubsDisc || null,
	growthParam.advantageWirelessGrowthRate || null,
	growthParam.advantageWirelessHWDisc || null,
	growthParam.advantageWirelessHWServDisc || null,
	growthParam.ecsInfraSubsDisc || null,
	growthParam.ecsInfraGrowthRate || null,
	growthParam.ecsInfraHWDisc || null,
	growthParam.ecsInfraHWServDisc || null,
	growthParam.ecsServMgmtSubsDisc || null,
	growthParam.ecsServMgmtGrowthRate || null,
	growthParam.ecsServMgmtHWDisc || null,
	growthParam.ecsServMgmtHWServDisc || null,
	growthParam.ecsCloudMgmtSubsDisc || null,
	growthParam.ecsCloudMgmtGrowthRate || null,
	growthParam.ecsCloudMgmtHWDisc || null,
	growthParam.ecsCloudMgmtHWServDisc || null,
	growthParam.tetrationSubsDisc || null,
	growthParam.tetrationGrowthRate || null,
	growthParam.tetrationHWDisc || null,
  growthParam.tetrationHWServDisc || null,	
  growthParam.wansSubsDisc || null,
  growthParam.wansGrowthRate || null,
  growthParam.wansHWDisc || null,
  growthParam.wansHWServDisc || null,
  growthParam.dcnsSubsDisc || null,
  growthParam.dcnsGrowthRate || null,
  growthParam.dcnsHWDisc || null,
  growthParam.dcnsHWServDisc || null,
    growthParam.createdBy || null,
    growthParam.updatedBy || null
  ];

  let output;

  if (hanaClient.readyState === 'connected') {
    return hanaClient.prepare('call save_growth_param_v3(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?)', (err, statement) => {
      if (err) {
        //hanaClient.disconnect();
        console.error('Prepare error:' + err);
        return res.jsonp({
          'Error': 'Prepare failed'
        });
      }
      return statement.exec(paramArr, (err, parameters, rows, tableRows) => {
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
  }
  else{
    return res.jsonp({
      'Error': 'Hana State error '+hanaClient.readyState
    });
  }

});

router.post('/fetch/ibqtytcv', (req, res) => {
  let prospectrefid = req.body.prospectrefid;
let v_identify_iba_yorn = req.body.v_identify_iba_yorn;
  let output;

  if (hanaClient.readyState === 'connected') {
    return hanaClient.prepare('call GET_IB_QTY_TCV_v9(?,?,?)', (err, statement) => {
      if (err) {
        //hanaClient.disconnect();
        console.error('Prepare error:' + err);
        return res.jsonp({
          'Error': 'Prepare failed'
        });
      }
      return statement.exec([prospectrefid,v_identify_iba_yorn], (err, parameters, rows, tableRows) => {
        //hanaClient.disconnect();
        if (err) {
          console.error('Execute error:', err);
          return res.jsonp({
            'Error': 'execution failed'
          });
        }

        var suiteArr = [];
        rows.forEach(function(row) {
          var suite = {
            SUITE: null,
            suiteDetails: []
          };
          suite.SUITE = row.SUITE;
          delete row.SUITE;
          suite.suiteDetails.push(row);
          suiteArr.push(suite);
        });

        var finalSuiteArr = [];

        suiteArr.forEach(function(suiteObj) {
          if (!this[suiteObj.SUITE]) {
            this[suiteObj.SUITE] = {
              suiteName: suiteObj.SUITE,
              suiteDetails: suiteObj.suiteDetails
            };
            finalSuiteArr.push(this[suiteObj.SUITE]);
            return;
          }
          this[suiteObj.SUITE].suiteDetails.push(suiteObj.suiteDetails[0]);
        }, Object.create(null));

        return res.json(finalSuiteArr);
      });
    });
  }
  else{
    return res.jsonp({
      'Error': 'Hana State error '+hanaClient.readyState
    });
  }

});

router.post('/fetch/manualqtytcv', (req, res) => {
  let prospectrefid = req.body.prospectrefid;

  let output;

  if (hanaClient.readyState === 'connected') {
    return hanaClient.prepare('call MANUAL_QTY_TCV_v7(?, ?)', (err, statement) => {
      if (err) {
        //hanaClient.disconnect();
        console.error('Prepare error:' + err);
        return res.jsonp({
          'Error': 'Prepare failed'
        });
      }
      return statement.exec([prospectrefid], (err, parameters, rows, tableRows) => {
        //hanaClient.disconnect();
        if (err) {
          console.error('Execute error:', err);
          return res.jsonp({
            'Error': 'execution failed'
          });
        }
        var suiteArr = [];
        rows.forEach(function(row) {
          var suite = {
            SUITE: null,
            suiteDetails: []
          };
          suite.SUITE = row.SUITE;
          delete row.SUITE;
          suite.suiteDetails.push(row);
          suiteArr.push(suite);
        });

        var finalSuiteArr = [];

        suiteArr.forEach(function(suiteObj) {
          if (!this[suiteObj.SUITE]) {
            this[suiteObj.SUITE] = {
              suiteName: suiteObj.SUITE,
              suiteDetails: suiteObj.suiteDetails
            };
            finalSuiteArr.push(this[suiteObj.SUITE]);
            return;
          }
          this[suiteObj.SUITE].suiteDetails.push(suiteObj.suiteDetails[0]);
        }, Object.create(null));

        return res.json(finalSuiteArr);
      });
    });
  }
  else{
    return res.jsonp({
      'Error': 'Hana State error '+hanaClient.readyState
    });
  }

});

router.post('/save/manualqtytcv', (req, res) => {
  var recordsArr = [];
  recordsArr = req.body;
  var modifiedRecordArr = [];
  recordsArr.forEach(function(recordObj) {
    var paramArr = [];
    paramArr.push(recordObj.prospectrefid, recordObj.suite, recordObj.lineItemId,
      recordObj.manualFndnQty, recordObj.manualAdvQty, recordObj.features,
      recordObj.createdDate, recordObj.createdBy, recordObj.manualSubQty, recordObj.manualEsQty );
    modifiedRecordArr.push(paramArr);
  });

  let output;

  if (hanaClient.readyState === 'connected') {
    return hanaClient.prepare('call SAVE_Manual_QTY_v2(TEMP_EA_PROSPECT_REF_QTY_UPDATES_v2)', (err, statement) => {
      if (err) {
        //hanaClient.disconnect();
        console.error('Prepare error:' + err);YY
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

});

router.post('/fetch/countryoftxn', (req, res) => {

  let output;

  if (hanaClient.readyState === 'connected') {
    return hanaClient.prepare('call get_country_of_transaction(?)', (err, statement) => {
      if (err) {
        //hanaClient.disconnect();
        console.error('Prepare error:' + err);
        return res.jsonp({
          'Error': 'Prepare failed'
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
        output = rows;
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

router.post('/fetch/report', (req, res) => {
  var prospectrefid = req.body.prospectrefid;
  var cecUser = req.body.cecUser;
  var createdBy = req.body.createdBy;
  var updatedBy = req.body.updatedBy;
  var Proposal_Reqd = req.body.ProposalReqd;
  let output;

  if (hanaClient.readyState === 'connected') {
    return hanaClient.prepare('call Generate_Report_v2(?, ?, ?, ?, ?)', (err, statement) => {

      if (err) {
        //hanaClient.disconnect();
        console.error('Prepare error:' + err);
        return res.jsonp({
          'Error': 'Prepare failed'
        });
      }
      return statement.exec([prospectrefid, cecUser, createdBy, updatedBy,  Proposal_Reqd], (err, parameters, rows, tableRows) => {
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
  }
  else{
    return res.jsonp({
      'Error': 'Hana State error '+hanaClient.readyState
    });
  }

});

router.post('/save/tcodata', (req, res) => {
  var prospectrefid = req.body.prospectrefid;
  let output;

  if (hanaClient.readyState === 'connected') {
    return hanaClient.prepare('call ea_persist_tco_data_v2(?)', (err, statement) => {
      if (err) {
        //hanaClient.disconnect();
        console.error('Prepare error:' + err);
        return res.jsonp({
          'Error': 'Prepare failed'
        });
      }
      return statement.exec([prospectrefid], (err, parameters, rows, tableRows) => {
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
  }
  else{
    return res.jsonp({
      'Error': 'Hana State error '+hanaClient.readyState
    });
  }

});

router.post('/fetch/reportstatus', (req, res) => {
  var prospectrefid = req.body.prospectrefid;
  let output;

  if (hanaClient.readyState === 'connected') {
    return hanaClient.prepare('call report_generation_status(?, ?)', (err, statement) => {
      if (err) {
        //hanaClient.disconnect();
        console.error('Prepare error:' + err);
        return res.jsonp({
          'Error': 'Prepare failed'
        });
      }
      return statement.exec([prospectrefid], (err, parameters, rows, tableRows) => {
        //hanaClient.disconnect();
        if (err) {
          console.error('Execute error:', err);
          return res.jsonp({
            'Error': 'execution failed'
          });
        }
        output = rows;
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

router.post('/upload/euif', (req, res) => {
  var prospectrefid = req.body.prospectrefid;
  var rowArr = [];
  var modifiedRowArr =[];
  rowArr = req.body.row;
  rowArr.forEach(function(rowObj) {
    var paramArr = [];
    paramArr.push(rowObj.rowNo, rowObj.columnValue);
    modifiedRowArr.push(paramArr);
  });
  var createdBy = req.body.createdBy;
  let output;

  if (hanaClient.readyState === 'connected') {
    return hanaClient.prepare('call ea_save_euif_form_pr_v2(?, TEMP_EA_EUIF_FORM_TAB, ?)', (err, statement) => {
      if (err) {
        //hanaClient.disconnect();
        console.error('Prepare error:' + err);
        return res.jsonp({
          'Error': 'Prepare failed'
        });
      }
      return updateEuifFormTemporaryTable(modifiedRowArr, (err) => {
        if (err) {
          //hanaClient.disconnect();
          console.error('Prepare Temp data error:', err);
          return res.jsonp({
            'Error': 'Prepare Temp Data failed'
          });
        }
        return statement.exec([prospectrefid, createdBy], (err, parameters, rows, tableRows) => {
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

});


router.post('/fetch/security/guidsbycrguname', (req, res) => {
  let crguname = req.body.crguname;
  let hierarchylevel = req.body.hierarchylevel;

  let output;
  if (hanaClient.readyState === 'connected') {
    return hanaClient.prepare('call ea_sec_get_gu_hq_name(?, ?, ?)', (err, statement) => {
      if (err) {
        //hanaClient.disconnect();
        console.error('Prepare error:' + err);
        return res.jsonp({
          'Error': 'Prepare failed'
        });
      }
      return statement.exec([crguname,hierarchylevel], (err, parameters, rows, tableRows) => {
        //hanaClient.disconnect();
        if (err) {
          console.error('Execute error:', err);
          return res.jsonp({
            'Error': 'execution failed'
          });
        }
        output = rows;
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


router.post('/fetch/security/summarydata', (req, res) => {
  var prospectrefid = req.body.prospectrefid;

  let output;
  if (hanaClient.readyState === 'connected') {
    return hanaClient.prepare('call EA_SEC_IBA_SUMM_DATA(?, ?)', (err, statement) => {
      if (err) {
        //hanaClient.disconnect();
        console.error('Prepare error:' + err);
        return res.jsonp({
          'Error': 'Prepare failed'
        });
      }
      return statement.exec([prospectrefid], (err, parameters, rows, tableRows) => {
        //hanaClient.disconnect();
        if (err) {
          console.error('Execute error:', err);
          return res.jsonp({
            'Error': 'execution failed'
          });
        }
        output = rows;
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

function updateProspectRefTemporaryTable(values, cb) {
  function truncate(cb) {
    var sql = 'truncate table TEMP_EA_PROSPECT_REF_QTY_UPDATES_V2';
    hanaClient.exec(sql, function(err) {
      cb(err);
    });
  }

  function prepare(cb) {
    var sql = 'insert into TEMP_EA_PROSPECT_REF_QTY_UPDATES_V2 values(?, ?, ?, ?, ?, ?, ?, ?, ?,?)';
    hanaClient.prepare(sql, cb);
  }

  function insertValues(statement, cb) {
    function createTasks(value) {
      return statement.exec.bind(statement, [value[0], value[1], value[2], value[3], value[4], value[5], value[6], value[7], value[8], value[9]]);
    }

    async.series(values.map(createTasks), function() {
      // ignore error
      statement.drop(cb);
    });
  }
  async.waterfall([truncate, prepare, insertValues], cb);
}

function updateEuifFormTemporaryTable(values, cb) {
  function truncate(cb) {
    var sql = 'truncate table TEMP_EA_EUIF_FORM_TAB';
    hanaClient.exec(sql, function(err) {
      cb(err);
    });
  }

  function prepare(cb) {
    var sql = 'insert into TEMP_EA_EUIF_FORM_TAB values(?, ?)';
    hanaClient.prepare(sql, cb);
  }

  function insertValues(statement, cb) {
    function createTasks(value) {
      return statement.exec.bind(statement, [value[0], value[1]]);
    }

    async.series(values.map(createTasks), function() {
      // ignore error
      statement.drop(cb);
    });
  }
  async.waterfall([truncate, prepare, insertValues], cb);
}

module.exports = router;