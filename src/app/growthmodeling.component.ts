import { Component, ViewContainerRef, NgZone } from '@angular/core';
import * as moment from 'moment';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { ReactiveFormsModule } from '@angular/forms'
import { CardComponent } from './card.component';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { PageComponent } from './page.component';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { SuiteDetail, SuiteDetailType } from './model/suiteDetail.model';
import { GrowthModelingService } from './service/growthModeling.service';
import { GetReportService } from './service/getReport.service';
import { OnInit} from '@angular/core';
import {IMyDpOptions, IMyDateModel, IMyCalendarViewChanged, IMyDate} from 'mydatepicker';
import {CreateProspectIDService} from './service/createProspectId.service';
import { BUSY_CONFIG_DEFAULTS, IBusyConfig } from "angular2-busy";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { getBusyConfig } from "./ciscospinner";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
//declare var $:any;

@Component({
  selector: 'app',
  templateUrl: './growthmodeling.component.html'
})
export class GrowthModelingComponent {
  title = 'app';
  private apiURL;
  prospectName: any;
  selectedSuites: any;
  busy: Subscription;
  busyConfig: IBusyConfig = getBusyConfig();
  submit : boolean = true;
  cedValidationMessage : string = "";
  countRefresh: number = 0;
  selectedCountry : string;
  modelTerm : string;
  modelPayment : string;
  message: string;
  asfoundation: any = [];
  asmanual: any = [];
  cecid : string = "";
  currCustTab: boolean = false;
  nextSuite: boolean = true;
  nextGP: boolean = true;
  nextGM: boolean = true;
  nextReportStatus: boolean = true;
  suiteActive: boolean = false;
  growthParamsFormDropdown : boolean = false;
  gpActive: boolean = false;
  gmActive: boolean = false;
  custDef: boolean = true;
  nonCustDef: boolean = false;
  prepay: any;
  next: boolean = false;
  term: any;
  asliid: any;
  dataGetCountry: any;
  additionalGUID : string = "";
  additionalHQID : string = "";
  additionalISID : string = "";  
  reportLinks : any = {};
  //elaStartDate : string;
  data: any;
  dataGU: any = {};
  dataHQ: any = {};
  dataIS: any = {};
  accessSwitchingSuites: SuiteDetail[] = [];
  accessSwitchingSuitesRefreshed: SuiteDetail[] = [];
  accessWirelessSuites: SuiteDetail[] = [];
  accessWirelessSuitesRefreshed: SuiteDetail[] = [];
  dccSuites: SuiteDetail[] = [];
  dccSuitesRefreshed: SuiteDetail[] = [];
  dcnSuites: SuiteDetail[] = [];
  dcnSuitesRefreshed: SuiteDetail[] = [];
  wanSuites: SuiteDetail[] = [];
  wanSuitesRefreshed: SuiteDetail[] = [];
  growthModelingAllSuites: SuiteDetail[] = [];
  refreshedManualTCVQty: SuiteDetail[] = [];
  prefname: any;
  countrySelected: any;
  dataSaveSuite: any = {};
  dataGP: any = {};
  dataIBTCVQty: any = "";
  dataGetDefaultGP: any = {};
  countSuites: any;  
  hrrsaveGP: any;
  asgrsaveGP: any;
  awgrsaveGP: any;
  dccgrsaveGP: any;
  dcngrsaveGP: any;
  wangrsaveGP: any;
  ashdsaveGP: any;
  awhdsaveGP: any;
  dcchdsaveGP: any;
  dcnhdsaveGP: any;
  wanhdsaveGP: any;
  ashsdsaveGP: any;
  awhsdsaveGP: any;
  dcchsdsaveGP: any;
  dcnhsdsaveGP: any;
  wanhsdsaveGP: any;

  assdsaveGP: any;
  awsdsaveGP: any;
  dccsdsaveGP: any;
  dcnsdsaveGP: any;
  wansdsaveGP: any;
  asswssdsaveGP: any;
  awswssdsaveGP: any;
  dccswssdsaveGP: any;
  dcnswssdsaveGP: any;
  wanswssdsaveGP: any;
  asadsaveGP: any;
  awadsaveGP: any;
  dcnadsaveGP: any;
  wanadsaveGP: any;
  dccadsaveGP: any;
  preselectedGUIDs: any;
  showASinGM = false;
  showAWinGM = false;
  showDCCinGM = false;
  showDCNinGM = false;
  showWANinGM = false;

  myForm: FormGroup;
  criteriaArray1: any = [];
  criteriaArray2: any = [];
  criteriaArray3: any = [];

  selectedGUName: any;
  selectedHQName: any;
  selectedISName: any;

  private elaStartDate : IMyDate = {year:0, month:0, day:0} ;

  comboValue: any;
  criteria: any;
  searchText: any;
  body: any = {};
  searchTextVal: any;
  showcrgu: boolean = false;
  showcrpp: boolean = false;
  showsitecr: boolean = false;
  accessswitchingCheck: boolean = false;
  accesswirelessCheck: boolean = false;
  dccomputeCheck: boolean = false;
  dcnetworkingCheck: boolean = false;
  wanCheck: boolean = false;
  prospectID: any;
  guName: any;
  sub: any;
  suiteForm: FormGroup;
  flow: any;
  date = new Date();
  numbers: any = [];
  newnumbers : any = [];

  constructor(private ngZone: NgZone, private http: Http, private fb: FormBuilder, private router: Router, private cpid : CreateProspectIDService,
    private route: ActivatedRoute, private pc: PageComponent, private growthService: GrowthModelingService,
    private reportService: GetReportService) {
    console.log('Hello !!!');

    this.numbers.push({item: 0})
    
    for(let i = 15; i <= 100; i++){    
      this.numbers.push({item : i})    
    }
    
    this.newnumbers.push({item: 0})
    
    for(let i = 50; i <= 100; i++){    
      this.newnumbers.push({item : i})    
    }

  }

  private myDatePickerInlineOptions: IMyDpOptions = {    
    inline: false,    
    disableUntil: {year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate()-1},
    showWeekNumbers: true,
    selectorHeight: '232px',
    selectorWidth: '252px',
    dateFormat: 'mm/dd/yyyy',
};

onDateChanged(event: IMyDateModel) {
  console.log("cal ::::: " + event.formatted);
  //this.elaStartDate = event.formatted;
  this.elaStartDate = event.date;
}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let guName = (params['GUName']);
      this.guName = guName;

      let preselectedGUIDs = (params['preselectedGUIDs']);
      this.preselectedGUIDs = preselectedGUIDs;

      this.searchText = "";
      this.searchTextVal = "";
      this.dataGU = "";
      this.dataHQ = "";
      this.dataIS = "";
    });

    let date = new Date(); console.log("date::  " + date); 
    // Disable/enable dates from 59th forward
    date.setDate(date.getDate() + 180);
    this.elaStartDate = {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()};
    
    
    let copy = this.getCopyOfOptions();
    copy.disableSince = {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()};
    this.myDatePickerInlineOptions = copy;  
                
    this.route.queryParams.subscribe((params: Params) => {
      this.guName = params['GUName'];
      console.log(this.guName);
    });

    //if (this.flow == 'true') {
      console.log("set CHECK BOX")
      this.accessswitchingCheck = true;
      this.accesswirelessCheck = true;
      this.dccomputeCheck = true;
      this.dcnetworkingCheck = true;
      this.wanCheck = true;
    //}
    this.myForm = this.fb.group({
      selectedCheckbox1: this.fb.array([]),
      selectedCheckbox2: this.fb.array([]),
      selectedCheckbox3: this.fb.array([]),
      selectedGUName: this.fb.array([]),
      selectedHQName: this.fb.array([]),
      selectedISName: this.fb.array([])
    });

    this.suiteForm = new FormGroup({
      accessswitching: new FormControl(),
      accesswireless: new FormControl(),
      dccompute: new FormControl(),
      dcnetworking: new FormControl(),
      wan: new FormControl()
    });

    this.suiteForm = this.fb.group({
      accessswitching: this.fb.control,
      accesswireless: this.fb.control,
      dccompute: this.fb.control,
      dcnetworking: this.fb.control,
      wan: this.fb.control
    });

   this.cpid.startProspecting(this.guName);
    console.log(" ??? " + this.cpid.prospectID);
  }

  getCopyOfOptions(): IMyDpOptions {
    return JSON.parse(JSON.stringify(this.myDatePickerInlineOptions));
  }

  onTermSelection($event) {
    if ($event.target.value == "3") {
      const term = $event.target.value;
      this.modelTerm = term;
    }
    else {
      const term = $event.target.value;
      this.modelTerm = term;
    }
  }

  onPrepaySelection($event) {
    this.growthParamsFormDropdown = true;
    if ($event.target.value == "Pre-paid") {
      const prepay = $event.target.value;
      this.modelPayment = prepay;
    }
    else {
      const prepay = $event.target.value;
      this.modelPayment = prepay;
    }
  }

  onCountrySelection($event) {
    this.selectedCountry = $event.target.value
  }

  onInput($event) {
    //$event.preventDefault();
    console.log("in on input func  ");
    this.showcrgu = false;
    this.showcrpp = false;
    this.showsitecr = false;

    if ($event.target.value == "crgupartyname" || $event.target.value == "crgupartyid") {
      console.log('selected: ' + $event.target.value);
      const criteria = $event.target.value;
      this.criteria = criteria;
      this.comboValue = 1;
      this.showcrgu = true;
      this.showsitecr = false;
      this.showcrpp = false;
      this.dataGU = "";
      console.log("DATA GU ::::: " + this.dataGU);
      this.searchTextVal = "";
      this.searchText = "";
      console.log("###   " + this.showcrgu);
    }
    else if ($event.target.value == "crparentpartyname" || $event.target.value == "crparentpartyid") {
      console.log('selected: ' + $event.target.value);
      const criteria = $event.target.value;
      this.criteria = criteria;
      this.comboValue = 2;
      this.showcrpp = true;
      this.showcrgu = false;
      this.showsitecr = false;
      this.dataHQ = "";
      this.searchTextVal = "";
      this.searchText = "";
      console.log("###   " + this.showcrpp);
    }
    else if ($event.target.value == "installsitecrpartyname" || $event.target.value == "installsitecrpartyid") {
      console.log('selected: ' + $event.target.value);
      const criteria = $event.target.value;
      this.criteria = criteria;
      this.comboValue = 3;
      this.showsitecr = true;
      this.showcrgu = false;
      this.showcrpp = false;
      this.dataIS = "";
      this.searchTextVal = "";
      this.searchText = "";
      console.log("###   " + this.showsitecr);
    }
  }

  onChange(name: string, selectedGUName:string, isChecked: boolean) {
    if (isChecked) {
      if (this.comboValue == 1) {
        this.criteriaArray1 = <FormArray>this.myForm.controls.selectedCheckbox1;
        this.criteriaArray1.push(new FormControl(name));
        this.selectedGUName = <FormArray>this.myForm.controls.selectedGUName;
        this.selectedGUName.push(new FormControl(selectedGUName));
        console.log("array 01 ::: " + this.criteriaArray1.value);
        
        console.log("LENGTH ::  " + this.criteriaArray1.length);
        console.log(this.selectedGUName.value);
      }

      else if (this.comboValue == 2) {
        this.criteriaArray2 = <FormArray>this.myForm.controls.selectedCheckbox2;
        this.criteriaArray2.push(new FormControl(name));
         this.selectedHQName = <FormArray>this.myForm.controls.selectedHQName;
         this.selectedHQName.push(new FormControl(selectedGUName));
        console.log("array 02 ::: " + this.criteriaArray2.value)
        console.log(this.selectedHQName.value);        
      }
      else if (this.comboValue == 3) {
        this.criteriaArray3 = <FormArray>this.myForm.controls.selectedCheckbox3;
        this.criteriaArray3.push(new FormControl(name));
        this.selectedISName = <FormArray>this.myForm.controls.selectedISName;
        this.selectedISName.push(new FormControl(selectedGUName));
        console.log("array 03 ::: " + this.criteriaArray3.value);
        console.log(this.selectedISName.value);
      }

    } else {

      if (this.comboValue == 1) {
        let index = this.criteriaArray1.controls.findIndex(x => x.value == name)
        this.criteriaArray1.removeAt(index);
        index = this.selectedGUName.controls.findIndex(x => x.value == selectedGUName)
        this.selectedGUName.removeAt(index);
      }
      else if (this.comboValue == 2) {
        let index = this.criteriaArray2.controls.findIndex(x => x.value == name)
        this.criteriaArray2.removeAt(index);
        index = this.selectedHQName.controls.findIndex(x => x.value == selectedGUName)
        this.selectedHQName.removeAt(index);
      }
      else if (this.comboValue == 3) {
        let index = this.criteriaArray3.controls.findIndex(x => x.value == name)
        this.criteriaArray3.removeAt(index);
        index = this.selectedISName.controls.findIndex(x => x.value == selectedGUName)
        this.selectedISName.removeAt(index);
      }
    }
  }

  removeGUIDs(name: string, gu: string) {
    let index = this.criteriaArray1.controls.findIndex(x => x.value == name)
    this.criteriaArray1.removeAt(index);
    index = this.selectedGUName.controls.findIndex(x=>x.value == gu)
    this.selectedGUName.removeAt(index);
  }
  removeHQIDs(name: string, gu: string) {
    let index = this.criteriaArray2.controls.findIndex(x => x.value == name)
    this.criteriaArray2.removeAt(index);
    index = this.selectedHQName.controls.findIndex(x=>x.value == gu)
    this.selectedHQName.removeAt(index);
  }
  removeISIDs(name: string, gu: string) {
    let index = this.criteriaArray3.controls.findIndex(x => x.value == name)
    this.criteriaArray3.removeAt(index);
    index = this.selectedISName.controls.findIndex(x=>x.value == gu)
    this.selectedISName.removeAt(index);
  }

  postDataFromURL() {
    console.log("in post data from url function " + this.criteria + "  " + this.searchTextVal);
    this.ngZone.run( () =>
    this.busyConfig.busy = this.postDataJSON().subscribe(data => {
      if (this.criteria == "crgupartyname" || this.criteria == "crgupartyid") {
        console.log("criteria :::" + this.criteria);
        this.dataGU = data;
        this.dataHQ = "";
        this.dataIS = "";
      }
      else if (this.criteria == "crparentpartyname" || this.criteria == "crparentpartyid") {
        this.dataHQ = data;
        this.dataGU = "";
        this.dataIS = "";
      }
      else if (this.criteria == "installsitecrpartyname" || this.criteria == "installsitecrpartyid") {
        console.log("criteria :::" + this.criteria);
        this.dataIS = data;
        this.dataGU = "";
        this.dataHQ = "";
      }
      console.log("in post data from url function 2");
      console.log("DATA gu :::  " + this.dataGU);
      console.log("DATA hq:::  " + this.dataHQ);
      console.log("DATA is :::  " + this.dataIS);
    })
  );
  }

  postDataJSON() {
    this.body = { "searchparam": this.criteria, "searchvalue": this.searchTextVal };
    console.log("in post data json function " + this.apiURL + " ::: body :::" + this.body);
    return this.http.post(this.apiURL, this.body).map((res: Response) => res.json());

  }

  showHide: boolean;
  showCardsVar: boolean = false;
  guCards : boolean = false;
  hqCards : boolean = false;
  isCards : boolean = false;

  public showCards(): void {
    this.showCardsVar = true;
    if(this.criteriaArray1.length !=0){
      this.guCards = true;
    }
    if(this.criteriaArray2.length !=0){
      this.hqCards = true;
    }
    if(this.criteriaArray3.length !=0){
      this.isCards = true;
    }
  }

  hide() {
    if(this.showHide){
    this.showHide = !this.showHide;
    }
    console.log("length ::::::   " +this.criteriaArray1.length);
    if(this.criteriaArray1.length !=0 || this.criteriaArray2.length !=0 || this.criteriaArray3.length != 0){
      this.showCards();
    }    
  }

  show(searchVal: string) {
    this.searchTextVal = searchVal;
    if(this.searchTextVal != ""){
    this.showHide = !this.showHide;
    console.log("SEARCH TEXT : " + this.searchTextVal);
    this.apiURL = "/api/cisco1ea/search";
    console.log(this.apiURL);
    this.postDataFromURL();
    }
  }

  saveCustDef(prospectRefName: string) {
    //if(prospectRefName != undefined){
    this.nextSuite = false;
    this.custDef = false;
    this.nonCustDef = true;
    
    this.suiteActive = true;
    this.prefname = prospectRefName;
    
      this.accessswitchingCheck = true;
      this.accesswirelessCheck = true;
      this.dccomputeCheck = true;
      this.dcnetworkingCheck = true;
      this.wanCheck = true;
       
    this.apiURL = "/api/cisco1ea/customer/save/definition";

    // this.additionalGUID = (JSON.stringify(this.myForm.value.selectedCheckbox1)).substring(1,JSON.stringify(this.myForm.value.selectedCheckbox1).length-1);
    // this.additionalHQID = (JSON.stringify(this.myForm.value.selectedCheckbox2)).substring(1,JSON.stringify(this.myForm.value.selectedCheckbox2).length-1)
    // this.additionalISID = (JSON.stringify(this.myForm.value.selectedCheckbox3)).substring(1,JSON.stringify(this.myForm.value.selectedCheckbox3).length-1)
   
    this.body = {
      "customer": {
        "prospectrefid": this.cpid.prospectID,
        "prospectrefname": this.prefname,
        "crguname": this.guName,
        "crguid": this.cpid.preselectedGUIDs,
        "addtcrguid": JSON.stringify(this.myForm.value.selectedCheckbox1),
        "addtcrhqid": JSON.stringify(this.myForm.value.selectedCheckbox2),
        "installsitecrpartyid": JSON.stringify(this.myForm.value.selectedCheckbox3),
        "createddate": "2017-02-10",
        "updateddate": "2017-02-10",
        "createdby": "saprasa2",
        "updatedby": "saprasa2"
      }
    }
    this.ngZone.run( () =>
    this.busyConfig.busy = this.getSaveCustDef().subscribe(data => {
    this.data = data;
      if (data.messsage == 'success') {
        this.http.post('/api/cisco1ea/prospect/fetch/countryoftxn', '').
        map((res: Response) => res.json()).subscribe(dataGetCountry => { this.dataGetCountry = dataGetCountry });
      }
    })
  );
    //$( "#tabEA" ).tabs({inactive: '#configuresuite'});
    console.log("tabs ::: " );
  //}
  // else{
  //   alert("Please enter a Prospect Reference name");
  // }
 }

  getSaveCustDef() {
    return this.http.post(this.apiURL, this.body).map((res: Response) => res.json());
  }

  saveSuite() {
    this.selectedSuites = "";
    this.accessswitchingCheck = this.suiteForm.get('accessswitching').value;
    this.accesswirelessCheck = this.suiteForm.get('accesswireless').value;
    this.dccomputeCheck = this.suiteForm.get('dccompute').value;
    this.dcnetworkingCheck = this.suiteForm.get('dcnetworking').value;
    this.wanCheck = this.suiteForm.get('wan').value;
    this.nextGP = false;
    
    this.modelTerm = "3";
    this.modelPayment = "Pre-paid";
    console.log("country default :::: " + this.selectedCountry);

    if (this.accessswitchingCheck) {
      this.selectedSuites += "ACCESS - SWITCHING ,";
      this.showASinGM = true;
    }
    if (this.accesswirelessCheck) {
      this.selectedSuites += "ACCESS - WIRELESS ,";
      this.showAWinGM = true;
    }
    if (this.dccomputeCheck) {
      this.selectedSuites += "DATA CENTER - COMPUTE ,";
      this.showDCCinGM = true;
    }
    if (this.dcnetworkingCheck) {
      this.selectedSuites += "DATA CENTER - NETWORKING ,";
      this.showDCNinGM = true;
    }
    if (this.wanCheck) {
      this.selectedSuites += "WAN";
      this.showWANinGM = true;
    }

    this.countSuites = this.selectedSuites.split(',').length;

    this.ngZone.run( () =>
    this.busyConfig.busy = this.getDataSaveSuite().subscribe(dataSaveSuite => { this.dataSaveSuite = dataSaveSuite;
    if(dataSaveSuite.messsage == "success"){    
        this.getDefaultGP().subscribe(dataGetDefaultGP => {
          this.dataGetDefaultGP = dataGetDefaultGP;
          for (let eachGP of this.dataGetDefaultGP) {
    
            if (eachGP.DEF_PARAM_KEY == "HW_Refresh_Rate") {
              this.hrrsaveGP = eachGP.DEF_PARAM_VALUE;
            }
            else if (eachGP.SUITE == 'ACCESS - SWITCHING') {
              if (eachGP.DEF_PARAM_KEY == "Growth_Rate") {
                this.asgrsaveGP = eachGP.DEF_PARAM_VALUE;
              }
              if (eachGP.DEF_PARAM_KEY == "Adv_Dep") {
                this.asadsaveGP = eachGP.DEF_PARAM_VALUE;
              }
              if (eachGP.DEF_PARAM_KEY == "SWSS_Disc") {
                this.asswssdsaveGP = eachGP.DEF_PARAM_VALUE;
              }
              if (eachGP.DEF_PARAM_KEY == "SW_Disc") {
                this.assdsaveGP = eachGP.DEF_PARAM_VALUE;
              }
              if (eachGP.DEF_PARAM_KEY == "HWServ_Disc") {
                this.ashsdsaveGP = eachGP.DEF_PARAM_VALUE;
              }
              if (eachGP.DEF_PARAM_KEY == "HW_Disc") {
                this.ashdsaveGP = eachGP.DEF_PARAM_VALUE;
              }
            }
    
            else if (eachGP.SUITE == 'ACCESS - WIRELESS') {
              if (eachGP.DEF_PARAM_KEY == "Growth_Rate") {
                this.awgrsaveGP = eachGP.DEF_PARAM_VALUE;
              }
              if (eachGP.DEF_PARAM_KEY == "Adv_Dep") {
                this.awadsaveGP = eachGP.DEF_PARAM_VALUE;
              }
              if (eachGP.DEF_PARAM_KEY == "SWSS_Disc") {
                this.awswssdsaveGP = eachGP.DEF_PARAM_VALUE;
              }
              if (eachGP.DEF_PARAM_KEY == "SW_Disc") {
                this.awsdsaveGP = eachGP.DEF_PARAM_VALUE;
              }
              if (eachGP.DEF_PARAM_KEY == "HWServ_Disc") {
                this.awhsdsaveGP = eachGP.DEF_PARAM_VALUE;
              }
              if (eachGP.DEF_PARAM_KEY == "HW_Disc") {
                this.awhdsaveGP = eachGP.DEF_PARAM_VALUE;
              }
            }
    
            else if (eachGP.SUITE == 'DATA CENTER - COMPUTE') {
              if (eachGP.DEF_PARAM_KEY == "Growth_Rate") {
                this.dccgrsaveGP = eachGP.DEF_PARAM_VALUE;
              }
              if (eachGP.DEF_PARAM_KEY == "Adv_Dep") {
                this.dccadsaveGP = eachGP.DEF_PARAM_VALUE;
              }
              if (eachGP.DEF_PARAM_KEY == "SWSS_Disc") {
    
                this.dccswssdsaveGP = eachGP.DEF_PARAM_VALUE;
    
              }
    
              if (eachGP.DEF_PARAM_KEY == "SW_Disc") {
    
                this.dccsdsaveGP = eachGP.DEF_PARAM_VALUE;
    
              }
    
              if (eachGP.DEF_PARAM_KEY == "HWServ_Disc") {
                this.dcchsdsaveGP = eachGP.DEF_PARAM_VALUE;    
              }
    
              if (eachGP.DEF_PARAM_KEY == "HW_Disc") {    
                this.dcchdsaveGP = eachGP.DEF_PARAM_VALUE;    
              }    
            }
    
            else if (eachGP.SUITE == 'DATA CENTER - NETWORKING') {    
              if (eachGP.DEF_PARAM_KEY == "Growth_Rate") {    
                this.dcngrsaveGP = eachGP.DEF_PARAM_VALUE;    
              }
    
              if (eachGP.DEF_PARAM_KEY == "Adv_Dep") {    
                this.dcnadsaveGP = eachGP.DEF_PARAM_VALUE;    
              }
    
              if (eachGP.DEF_PARAM_KEY == "SWSS_Disc") {    
                this.dcnswssdsaveGP = eachGP.DEF_PARAM_VALUE;    
              }
    
              if (eachGP.DEF_PARAM_KEY == "SW_Disc") {    
                this.dcnsdsaveGP = eachGP.DEF_PARAM_VALUE;    
              }
    
              if (eachGP.DEF_PARAM_KEY == "HWServ_Disc") {    
                this.dcnhsdsaveGP = eachGP.DEF_PARAM_VALUE;    
              }
    
              if (eachGP.DEF_PARAM_KEY == "HW_Disc") {    
                this.dcnhdsaveGP = eachGP.DEF_PARAM_VALUE;    
              }
    
            }
    
            else if (eachGP.SUITE == 'WAN') {
              if (eachGP.DEF_PARAM_KEY == "Growth_Rate") {
                this.wangrsaveGP = eachGP.DEF_PARAM_VALUE;
              }
              if (eachGP.DEF_PARAM_KEY == "Adv_Dep") {
                this.wanadsaveGP = eachGP.DEF_PARAM_VALUE;
              }
              if (eachGP.DEF_PARAM_KEY == "SWSS_Disc") {
                this.wanswssdsaveGP = eachGP.DEF_PARAM_VALUE;
              }
              if (eachGP.DEF_PARAM_KEY == "SW_Disc") {
                this.wansdsaveGP = eachGP.DEF_PARAM_VALUE;
              }
              if (eachGP.DEF_PARAM_KEY == "HWServ_Disc") {
                this.wanhsdsaveGP = eachGP.DEF_PARAM_VALUE;
              }
              if (eachGP.DEF_PARAM_KEY == "HW_Disc") {
                this.wanhdsaveGP = eachGP.DEF_PARAM_VALUE;
              }
            }
          }
        });
    }
    this.selectedCountry = this.dataGetCountry[136].COUNTRY;
   })
  );
  }

  getDefaultGP() {
    this.apiURL = "/api/cisco1ea/prospect/fetch/defaultparam";
    this.body = { "offerid": "C1" };
    return this.http.post(this.apiURL, this.body).map((res: Response) => res.json());
  }

  getDataSaveSuite() {
    this.apiURL = "/api/cisco1ea/prospect/save/suiteinfo";
    this.body = { "prospectrefid": this.cpid.prospectID, "growthparam": this.selectedSuites, "createdBy": "test", "updatedBy": "test" };
    return this.http.post(this.apiURL, this.body).map((res: Response) => res.json());
  }

  saveGP(ashd: string, awhd: string, dcchd: string, dcnhd: string, wanhd: string,
    ashsd: string, awhsd: string, dcchsd: string, dcnhsd: string, wanhsd: string, assd: string, awsd: string, dccsd: string,
    dcnsd: string, wansd: string, asswssd: string, awswssd: string, dccswssd: string, dcnswssd: string, wanswssd: string, asad: string,
    awad: string, dcnad: string, wanad: string, asgr: string, awgr: string, dccgr: string, dcngr: string, wangr: string, hwrefreshrate: string) 
    {
    this.growthParamsFormDropdown = false;
    this.next = true;
    let {year,month,day} = this.elaStartDate;
    console.log("assd :::  ")
    console.log("****   " + this.selectedCountry);
    this.apiURL = "/api/cisco1ea/prospect/save/growthparam";
    this.body = {
      "growthParam" :{"prospectRefId": this.cpid.prospectID,"term": this.modelTerm,"paymentMethod": this.modelPayment,"elaStarDate": `${month}/${day}/${year}`,"countryOfTransaction": this.selectedCountry,"hwRefreshDate": hwrefreshrate, 
        "accessSwitchingHWDisc": ashd,"accessWirelessHWDisc": awhd,"dataCenterComputeHWDisc": dcchd,"dataCenterNetworkingHWDisc": dcnhd,"wanHWDisc": wanhd,"accessSwitchingHWServDisc": ashsd,
        "accessWirelessHWServDisc": awhsd,"dataCenterComputeHWServDisc": dcchsd,"dataCenterNetworkingHWServDisc": dcnhsd,"wanHWServDisc": wanhsd,"accessSwitchingSWDisc": assd,"accessWirelessSWDisc": awsd,
        "dataCenterComputeSWDisc": dccsd,"dataCenterNetworkingSWDisc": dcnsd,"wanSWDisc": wansd,"accessSwitchingSWSSDisc": asswssd,"accessWirelessSWSSDisc": awswssd,"dataCenterComputeSWSSDisc": dccswssd,
        "dataCenterNetworkingSWSSDisc": dcnswssd,"wanSWSSDisc": wanswssd,"accessSwitchingAdvDep": asad,"accessWirelessAdvDep": awad,"dataCenterComputeAdvDep": "10","dataCenterNetworkingAdvDep": dcnad,
        "wanAdvDep": wanad,"accessSwitchingGrowthRate": asgr,"accessWirelessGrowthRate": awgr,"dataCenterComputeGrowthRate": dccgr,"dataCenterNetworkingGrowthRate": dcngr,"wanGrowthRate": wangr,"createdBy": "test","updatedBy": "test"
      }
    }
    this.ngZone.run( () =>
    this.busyConfig.busy = this.getDataSaveGP().subscribe(data => { this.dataGP = data })
  );
  }

  getIBTCVQtyData() {
    console.log("in IB TCV QTY");
    this.ngZone.run( () =>
    this.busyConfig.busy = this.getIBTCVQtyFromHANA().subscribe(data => {
      this.dataIBTCVQty = data;
      console.log("enrty :::  " + data);

      for (let entry of data) {
        console.log(entry.suiteName)

        if (entry.suiteName == SuiteDetailType.ACCESS_SWITCHING) {
          
          this.accessSwitchingSuites = [];
          for (let json of entry.suiteDetails) {
            let accessSuite = new SuiteDetail(json, SuiteDetailType.ACCESS_SWITCHING, this.cpid.prospectID);
            this.accessSwitchingSuites.push(accessSuite);
            this.growthModelingAllSuites.push(accessSuite);
          }
          this.accessSwitchingSuitesRefreshed = this.accessSwitchingSuites;
        }

        else if (entry.suiteName == SuiteDetailType.ACCESS_WIRELESS) {
         
          this.accessWirelessSuites = [];
          for (let json of entry.suiteDetails) {
            let accessWirelessSuite = new SuiteDetail(json, SuiteDetailType.ACCESS_WIRELESS, this.cpid.prospectID);
            this.accessWirelessSuites.push(accessWirelessSuite);
            this.growthModelingAllSuites.push(accessWirelessSuite);
          }
          this.accessWirelessSuitesRefreshed = this.accessWirelessSuites;
        }

        else if (entry.suiteName == SuiteDetailType.DATA_CENTER_CENTER) {
         
          this.dccSuites = [];
          for (let json of entry.suiteDetails) {
            let dccSuite = new SuiteDetail(json, SuiteDetailType.DATA_CENTER_CENTER, this.cpid.prospectID);
            this.dccSuites.push(dccSuite);
            this.growthModelingAllSuites.push(dccSuite);
          }
          this.dccSuitesRefreshed = this.dccSuites;
        }

        else if (entry.suiteName == SuiteDetailType.DATA_CENTER_NETWORKING) {
          
          this.dcnSuites = [];
          for (let json of entry.suiteDetails) {
            let dcnSuite = new SuiteDetail(json, SuiteDetailType.DATA_CENTER_NETWORKING, this.cpid.prospectID);
            this.dcnSuites.push(dcnSuite);
            this.growthModelingAllSuites.push(dcnSuite);
          }
          this.dcnSuitesRefreshed = this.dcnSuites;
        }

        else if (entry.suiteName == SuiteDetailType.WAN) {
          
          this.wanSuites = [];
          for (let json of entry.suiteDetails) {
            let wanSuite = new SuiteDetail(json, SuiteDetailType.WAN, this.cpid.prospectID);
            this.wanSuites.push(wanSuite);
            this.growthModelingAllSuites.push(wanSuite);
          }
          this.wanSuitesRefreshed = this.wanSuites;
        }
      }
    })
  );
  }

  getIBTCVQtyFromHANA() {
    console.log("in IB TCV QTY HANA  ");
    this.nextGM = false;
    this.apiURL = "/api/cisco1ea/prospect/fetch/ibqtytcv";
    this.body = { "prospectrefid": this.cpid.prospectID };
    return this.http.post(this.apiURL, this.body).map((res: Response) => res.json());
  }

  getDataSaveGP() {
    return this.http.post(this.apiURL, this.body).map((res: Response) => res.json());
  }

  updateManualQty() {
    this.ngZone.run( () =>
    this.busyConfig.busy = this.growthService.updateManualQty(this.growthModelingAllSuites).subscribe((response) => {
      console.log(response);
      if (response.messsage == 'success') {
        console.log('inside');
        this.submit = true;
        this.refreshManualQty();
      }
    }, err => {
      console.log(err);
    })
  );
  }

  refreshManualQty() {
    this.ngZone.run( () =>
    this.busyConfig.busy = this.growthService.getManualQty(this.cpid.prospectID).subscribe((response) => {
      console.log("Refreshed no of times ::: " + this.countRefresh++ + response);
      this.refreshedManualTCVQty = response;
      this.growthModelingAllSuites = [];

      for (let entry of response) {
        if (entry.suiteName == SuiteDetailType.ACCESS_SWITCHING) {          
          this.accessSwitchingSuitesRefreshed = [];
          for (let json of entry.suiteDetails) {
            let accessSuite = new SuiteDetail(json, SuiteDetailType.ACCESS_SWITCHING, this.cpid.prospectID);
            this.accessSwitchingSuitesRefreshed.push(accessSuite);
            this.growthModelingAllSuites.push(accessSuite)
          }
          //this.growthModelingAllSuites = this.accessSwitchingSuitesRefreshed;
        }

        else if (entry.suiteName == SuiteDetailType.ACCESS_WIRELESS) {         
          this.accessWirelessSuitesRefreshed = [];
          for (let json of entry.suiteDetails) {
            let accessWirelessSuite = new SuiteDetail(json, SuiteDetailType.ACCESS_WIRELESS, this.cpid.prospectID);
            this.accessWirelessSuitesRefreshed.push(accessWirelessSuite);
            this.growthModelingAllSuites.push(accessWirelessSuite)
          }
          //this.growthModelingAllSuites = this.accessWirelessSuitesRefreshed;
        }

        else if (entry.suiteName == SuiteDetailType.DATA_CENTER_CENTER) {          
          this.dccSuitesRefreshed = [];
          for (let json of entry.suiteDetails) {
            let dccSuite = new SuiteDetail(json, SuiteDetailType.DATA_CENTER_CENTER, this.cpid.prospectID);
            this.dccSuitesRefreshed.push(dccSuite);
            this.growthModelingAllSuites.push(dccSuite)
          }
         // this.growthModelingAllSuites = this.dccSuitesRefreshed;
        }

        else if (entry.suiteName == SuiteDetailType.DATA_CENTER_NETWORKING) {          
          this.dcnSuitesRefreshed = [];
          for (let json of entry.suiteDetails) {
            let dcnSuite = new SuiteDetail(json, SuiteDetailType.DATA_CENTER_NETWORKING, this.cpid.prospectID);
            this.dcnSuitesRefreshed.push(dcnSuite);
            this.growthModelingAllSuites.push(dcnSuite)
          }
         //this.growthModelingAllSuites = this.dcnSuitesRefreshed;
        }

        else if (entry.suiteName == SuiteDetailType.WAN) {          
          this.wanSuitesRefreshed = [];
          for (let json of entry.suiteDetails) {
            let wanSuite = new SuiteDetail(json, SuiteDetailType.WAN, this.cpid.prospectID);
            this.wanSuitesRefreshed.push(wanSuite);
            this.growthModelingAllSuites.push(wanSuite)
          }
         // this.growthModelingAllSuites = this.wanSuitesRefreshed;
        }
      }
    }, err => {
      console.log(err);
    })
  );
  }

  enterReportEntryFunction(cecid : string) {
    if(cecid != ""){
      this.cedValidationMessage = "";
    this.cecid = cecid;
    this.nextReportStatus = false;
    this.ngZone.run( () =>
    this.busyConfig.busy = this.growthService.updateManualQty(this.growthModelingAllSuites).subscribe((response) => {
      console.log(response);
      this.reportService.enterReportEntryFunction(this.cpid.prospectID,this.cecid).subscribe((response) => {
        console.log(response);
        if (response.messsage == 'success') {
          console.log('inside report');
          this.ngZone.run( () =>
          this.reportService.getDownloadableReportLinks().subscribe((response) => {
            this.reportLinks = response[0];
            // if (this.reportLinks.STATUS == "Pending"){
            //   console.log("refresh ...  ");
            //   this.reportService.refreshEveryMinute();
            // }          
          })
        );
        }
      })
      alert("An email will be sent to your CEC id !!! ");  
    })
  );
 }
else{
  alert("Please enter your CEC id");
  //this.cedValidationMessage = "Please enter your CEC id";
}
}

  back() {
    this.router.navigate(['https://tab-app-116-p.cisco.com/#/site/CDOanalytics/views/EnterpiseAgreementProspectingTool-F02/LandingPage?:iid=1']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
