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
import {SearchComponent} from './search.component';
import {GetProspectService} from './service/getProspect.service';
import {GetIBTCVQtyService} from './service/getIBTCVQty.service';
declare var $:any;

@Component({
  selector: 'existing-prospect',
  templateUrl: './existingProspect.component.html'
})
export class ExistingProspectComponent {

  constructor(private ngZone : NgZone, private http: Http, private fb: FormBuilder, private router: Router, private cpid : CreateProspectIDService,
    private route: ActivatedRoute, private pc: PageComponent, private growthService: GrowthModelingService, private getibtcv : GetIBTCVQtyService,
    private reportService: GetReportService, private searchComponent : SearchComponent,private gps : GetProspectService) {

      this.numbers.push({item: 0})
      
      for(let i = 15; i <= 100; i++){    
        this.numbers.push({item : i})    
      }
      
      this.newnumbers.push({item: 0})
      
      for(let i = 50; i <= 100; i++){    
        this.newnumbers.push({item : i})    
      }
  }

  sub : any;
  flag : string = "modal2";
  prospectid : string = "";
  PROSPECT_REFERENCE_NAME : string = "";
  ORIGINAL_CR_GU_ID : string = "";
  ORIGINAL_CR_GU_NAME : string = "";
  date : any = "";
  
  showcrgu: boolean = false;
  showcrpp: boolean = false;
  showsitecr: boolean = false;
  accessswitchingCheck: boolean = false;
  accesswirelessCheck: boolean = false;
  dccomputeCheck: boolean = false;
  dcnetworkingCheck: boolean = false;
  wanCheck: boolean = false;
  suiteForm: FormGroup;
  myForm: FormGroup;
  suitesChecked : any = [];
  showHide: boolean;
  showCardsVar: boolean = false;
  guCards : boolean = false;
  hqCards : boolean = false;
  isCards : boolean = false;
  searchTextVal : string = "";
  selectedSuites : string= "";
  busyConfig: IBusyConfig = getBusyConfig();
  apiURL : string= "";
  nextSuite: boolean = true;
  nextGP: boolean = true;
  nextGM: boolean = true;
  nextReportStatus: boolean = true;
  suiteActive: boolean = false;
  gpActive: boolean = false;
  gmActive: boolean = false;
  custDef: boolean = true;
  nonCustDef: boolean = false;
  showASinGM = false;
  showAWinGM = false;
  showDCCinGM = false;
  showDCNinGM = false;
  showWANinGM = false;
  dataSaveSuite : any;
  growthParamsFormDropdown : boolean = false;

  dataIBTCVQty: any = "";
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

  dataGP : any ;
  next : boolean = false;
  dataGetCountry: any;
  additionalGUID : string = "";
  additionalHQID : string = "";
  additionalISID : string = "";  
  reportLinks : any = {};
  hrrsaveGP: any;
  asgrsaveGP: any;
  criteriaArray1: any = this.gps.ADDT_CR_GU_ID;
  criteriaArray2: any = [];
  criteriaArray3: any = [];

  cecid : string = "";
  selectedGUName: any;
  selectedHQName: any;
  selectedISName: any;

  comboValue: any;
  criteria: any;
  searchText: any;
  body: any = {};
  model : any ;
  data : any;
  dataGU: any = {};
  dataHQ: any = {};
  dataIS: any = {};

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

  modelTerm : string = "";
  selectedCountry : string = "";
  modelPayment : string = "";
  elaStartDate : string = "" ; // IMyDate = {year:0, month:0, day:0} ;

  numbers: any = [];
  newnumbers : any = [];

//   private myDatePickerInlineOptions: IMyDpOptions = {
    
//     inline: false,    
//     disableUntil: {year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate()-1},
//     showWeekNumbers: true,
//     selectorHeight: '232px',
//     selectorWidth: '252px',
//     dateFormat: 'mm/dd/yyyy',
// };

  onDateChanged(event: IMyDateModel) {
    console.log("cal ::::: " + event.formatted);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let prospectid = (params['prospectid']);
      this.prospectid = prospectid;
    });
    // this.showCardsVar = true;
    // this.guCards = true;

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

    // let date = new Date(); console.log("date::  " + date); 
    // // Disable/enable dates from 59th forward
    // date.setDate(date.getDate() + 59);
    // let copy = this.getCopyOfOptions();
    // copy.disableSince = {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()};
    // this.myDatePickerInlineOptions = copy;  

    if(this.gps.selectedSuites){
      this.suitesChecked = this.gps.selectedSuites.split(",");
    }
        
    for(let x of this.suitesChecked){
      console.log(x)
      if(x == "ACCESS - SWITCHING "){        
        this.accessswitchingCheck = true;
      }
      else if(x == "ACCESS - WIRELESS "){        
        this.accesswirelessCheck = true;
      }
      else if(x == "DATA CENTER - COMPUTE "){        
        this.dccomputeCheck = true;
      }
      else if(x == "DATA CENTER - NETWORKING "){
        this.dcnetworkingCheck = true;
      }
      else if(x == "WAN"){
        this.wanCheck = true;
      }
    }

    this.dataGU = "";
    this.dataHQ = "";
    this.dataIS = "";

    this.modelTerm = this.gps.growthParam[0].V_TERM;
    this.selectedCountry = this.gps.growthParam[0].V_COUNTRY_OF_TRANSACTION;
    this.modelPayment = this.gps.growthParam[0].V_PAYMENT_METHOD;
    this.model = this.gps.growthParam[0].V_ELA_START_DATE;
    console.log("date :::    " +this.model);

    this.elaStartDate = this.model;

    this.hrrsaveGP = this.gps.growthParam[0].V_HW_REFRESH_RATE;

    this.ashdsaveGP  = this.gps.growthParam[0].V_ACCESS_SWITCHING_HW_DISC;
    this.ashsdsaveGP  = this.gps.growthParam[0].V_ACCESS_SWITCHING_HWSERV_DISC;
    this.assdsaveGP  = this.gps.growthParam[0].V_ACCESS_SWITCHING_SW_DISC;
    this.asswssdsaveGP  = this.gps.growthParam[0].V_ACCESS_SWITCHING_SWSS_DISC;
    this.asadsaveGP  = this.gps.growthParam[0].V_ACCESS_SWITCHING_ADV_DEP;
    this.asgrsaveGP  = this.gps.growthParam[0].V_ACCESS_SWITCHING_GROWTH_RATE;

    this.awhdsaveGP  = this.gps.growthParam[0].V_ACCESS_WIRELESS_HW_DISC;
    this.awhsdsaveGP  = this.gps.growthParam[0].V_ACCESS_WIRELESS_HWSERV_DISC;
    this.awsdsaveGP  = this.gps.growthParam[0].V_ACCESS_WIRELESS_SW_DISC;
    this.awswssdsaveGP  = this.gps.growthParam[0].V_ACCESS_WIRELESS_SWSS_DISC;
    this.awadsaveGP  = this.gps.growthParam[0].V_ACCESS_WIRELESS_ADV_DEP;
    this.awgrsaveGP  = this.gps.growthParam[0].V_ACCESS_WIRELESS_GROWTH_RATE;

    this.dcchdsaveGP  = this.gps.growthParam[0].V_DATA_CENTER_COMPUTE_HW_DISC;
    this.dcchsdsaveGP  = this.gps.growthParam[0].V_DATA_CENTER_COMPUTE_HWSERV_DISC;
    this.dccsdsaveGP  = this.gps.growthParam[0].V_DATA_CENTER_COMPUTE_SW_DISC;
    this.dccswssdsaveGP  = this.gps.growthParam[0].V_DATA_CENTER_COMPUTE_SWSS_DISC;
    this.dccadsaveGP  = this.gps.growthParam[0].V_DATA_CENTER_COMPUTE_ADV_DEP;
    this.dccgrsaveGP  = this.gps.growthParam[0].V_DATA_CENTER_COMPUTE_GROWTH_RATE;

    this.dcnhdsaveGP  = this.gps.growthParam[0].V_DATA_CENTER_NETWORKING_HW_DISC;
    this.dcnhsdsaveGP  = this.gps.growthParam[0].V_DATA_CENTER_NETWORKING_HWSERV_DISC;
    this.dcnsdsaveGP  = this.gps.growthParam[0].V_DATA_CENTER_NETWORKING_SW_DISC;
    this.dcnswssdsaveGP  = this.gps.growthParam[0].V_DATA_CENTER_NETWORKING_SWSS_DISC;
    this.dcnadsaveGP  = this.gps.growthParam[0].V_DATA_CENTER_NETWORKING_ADV_DEP;
    this.dcngrsaveGP  = this.gps.growthParam[0].V_DATA_CENTER_NETWORKING_GROWTH_RATE;

    this.wanhdsaveGP  = this.gps.growthParam[0].V_WAN_HW_DISC;
    this.wanhsdsaveGP  = this.gps.growthParam[0].V_WAN_HWSERV_DISC;
    this.wansdsaveGP  = this.gps.growthParam[0].V_WAN_SW_DISC;
    this.wanswssdsaveGP  = this.gps.growthParam[0].V_WAN_SWSS_DISC;
    this.wanadsaveGP  = this.gps.growthParam[0].V_WAN_ADV_DEP;
    this.wangrsaveGP  = this.gps.growthParam[0].V_WAN_HW_DISC;

    
    // for (let x of this.gps.ADDT_CR_GU_ID){
    //   console.log("qqq   "+ x);
    //   // console.log("aaa   "+this.gps.ADDT_CR_GU_NAME[x]);
    //   this.guCards = true;
    //   this.criteriaArray1.push(x);      
    // }
    // for(let x of this.gps.ADDT_CR_GU_NAME){
    //   console.log("aaa   " + x);
    //   this.selectedGUName.push((new FormControl(x)));
    // }
    // console.log("done ..... ");
  }
  // getCopyOfOptions(): IMyDpOptions {
  //   return JSON.parse(JSON.stringify(this.myDatePickerInlineOptions));
  // }

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
        console.log("array 01 ::: " + this.criteriaArray1.value)
        
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
  
  saveCustDef(prospectRefName: string) {    
    this.nextSuite = false;
    this.custDef = false;
    this.nonCustDef = true;
    
    this.suiteActive = true;    
      this.accessswitchingCheck = true;
      this.accesswirelessCheck = true;
      this.dccomputeCheck = true;
      this.dcnetworkingCheck = true;
      this.wanCheck = true;
       
    this.apiURL = "/api/cisco1ea/customer/save/definition";

    this.additionalGUID = (JSON.stringify(this.myForm.value.selectedCheckbox1)).substring(1,JSON.stringify(this.myForm.value.selectedCheckbox1).length-1);
    this.additionalHQID = (JSON.stringify(this.myForm.value.selectedCheckbox2)).substring(1,JSON.stringify(this.myForm.value.selectedCheckbox2).length-1)
    this.additionalISID = (JSON.stringify(this.myForm.value.selectedCheckbox3)).substring(1,JSON.stringify(this.myForm.value.selectedCheckbox3).length-1)
   
    this.body = {
      "customer": {
        "prospectrefid": this.prospectid,
        "prospectrefname": this.gps.PROSPECT_REFERENCE_NAME,
        "crguname": this.gps.ORIGINAL_CR_GU_NAME,
        "crguid": this.gps.ORIGINAL_CR_GU_ID,
        "addtcrguid": this.additionalGUID,
        "addtcrhqid": this.additionalHQID,
        "installsitecrpartyid": this.additionalISID,
        "createddate": "2017-02-10",
        "updateddate": "2017-02-10",
        "createdby": "saprasa2",
        "updatedby": "saprasa2"
      }
    }
    this.ngZone.run( () =>
    this.busyConfig.busy = this.getSaveCustDef().subscribe(data => {
    this.data = data;      
    })
  );
 }

  getSaveCustDef() {
    return this.http.post(this.apiURL, this.body).map((res: Response) => res.json());
  }

  saveSuite() {
  if(this.gps.selectedSuites == ""){
      this.selectedSuites = "";
  }
  else {
    this.selectedSuites = this.gps.selectedSuites;
  }
    this.accessswitchingCheck = this.suiteForm.get('accessswitching').value;
    this.accesswirelessCheck = this.suiteForm.get('accesswireless').value;
    this.dccomputeCheck = this.suiteForm.get('dccompute').value;
    this.dcnetworkingCheck = this.suiteForm.get('dcnetworking').value;
    this.wanCheck = this.suiteForm.get('wan').value;
    
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
    this.ngZone.run( () =>
    this.busyConfig.busy = this.getDataSaveSuite().subscribe(dataSaveSuite => { this.dataSaveSuite = dataSaveSuite;
    })
  );
  }

  getDataSaveSuite() {
    this.apiURL = "/api/cisco1ea/prospect/save/suiteinfo";
    this.body = { "prospectrefid": this.prospectid, "growthparam": this.selectedSuites, "createdBy": "test", "updatedBy": "test" };
    return this.http.post(this.apiURL, this.body).map((res: Response) => res.json());
  }

  saveGP(ashd: string, awhd: string, dcchd: string, dcnhd: string, wanhd: string,
    ashsd: string, awhsd: string, dcchsd: string, dcnhsd: string, wanhsd: string, assd: string, awsd: string, dccsd: string,
    dcnsd: string, wansd: string, asswssd: string, awswssd: string, dccswssd: string, dcnswssd: string, wanswssd: string, asad: string,
    awad: string, dcnad: string, wanad: string, asgr: string, awgr: string, dccgr: string, dcngr: string, wangr: string, hwrefreshrate: string) 
    {
    this.growthParamsFormDropdown = false;
    this.next = true;
    console.log("assd :::  ")
    console.log("****   " + this.selectedCountry);
    this.apiURL = "/api/cisco1ea/prospect/save/growthparam";
    this.body = {
      "growthParam" :{"prospectRefId": this.prospectid,"term": this.modelTerm,"paymentMethod": this.modelPayment,"elaStarDate": this.elaStartDate,"countryOfTransaction": this.selectedCountry,"hwRefreshDate": hwrefreshrate, 
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

  getDataSaveGP() {
    return this.http.post(this.apiURL, this.body).map((res: Response) => res.json());
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
  show(searchVal: string) {
    this.searchTextVal = searchVal;
    this.showHide = !this.showHide;
    this.postDataFromURL(searchVal);    
  }

  hide() {
    this.showHide = !this.showHide;
    console.log("length ::  " + this.criteriaArray1.value);
    if(this.criteriaArray1.length !=0 || this.criteriaArray2.length !=0 || this.criteriaArray3.length != 0){
      this.showCards();
    }    
  }

  postDataFromURL(searchTextVal : string) {
    this.apiURL = "/api/cisco1ea/search";
    console.log("in post data from url function " + this.criteria + "  " + searchTextVal);
    this.ngZone.run( () =>
    this.busyConfig.busy = this.postDataJSON(searchTextVal).subscribe(data => {
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
postDataJSON(searchTextVal:string) {
  this.body = { "searchparam": this.criteria, "searchvalue": searchTextVal };
  console.log("in post data json function " + this.apiURL + " ::: body :::" + this.body);
  return this.http.post(this.apiURL, this.body).map((res: Response) => res.json());
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
          let accessSuite = new SuiteDetail(json, SuiteDetailType.ACCESS_SWITCHING, this.prospectid);
          this.accessSwitchingSuites.push(accessSuite);
          this.growthModelingAllSuites.push(accessSuite);
        }
        this.accessSwitchingSuitesRefreshed = this.accessSwitchingSuites;
        this.getibtcv.accessSwitchingSuites = this.accessSwitchingSuites;
        this.getibtcv.accessSwitchingSuitesRefreshed = this.accessSwitchingSuitesRefreshed;
      }

      else if (entry.suiteName == SuiteDetailType.ACCESS_WIRELESS) {
       
        this.accessWirelessSuites = [];
        for (let json of entry.suiteDetails) {
          let accessWirelessSuite = new SuiteDetail(json, SuiteDetailType.ACCESS_WIRELESS, this.prospectid);
          this.accessWirelessSuites.push(accessWirelessSuite);
          this.growthModelingAllSuites.push(accessWirelessSuite);
        }
        this.accessWirelessSuitesRefreshed = this.accessWirelessSuites;
        this.getibtcv.accessWirelessSuites = this.accessWirelessSuites;
        this.getibtcv.accessWirelessSuitesRefreshed = this.accessWirelessSuitesRefreshed;
      }

      else if (entry.suiteName == SuiteDetailType.DATA_CENTER_CENTER) {
       
        this.dccSuites = [];
        for (let json of entry.suiteDetails) {
          let dccSuite = new SuiteDetail(json, SuiteDetailType.DATA_CENTER_CENTER, this.prospectid);
          this.dccSuites.push(dccSuite);
          this.growthModelingAllSuites.push(dccSuite);
        }
        this.dccSuitesRefreshed = this.dccSuites;
        this.getibtcv.dccSuites = this.dccSuites;
        this.getibtcv.dccSuitesRefreshed = this.dccSuitesRefreshed;
      }

      else if (entry.suiteName == SuiteDetailType.DATA_CENTER_NETWORKING) {
        
        this.dcnSuites = [];
        for (let json of entry.suiteDetails) {
          let dcnSuite = new SuiteDetail(json, SuiteDetailType.DATA_CENTER_NETWORKING, this.prospectid);
          this.dcnSuites.push(dcnSuite);
          this.growthModelingAllSuites.push(dcnSuite);
        }
        this.dcnSuitesRefreshed = this.dcnSuites;
        this.getibtcv.dcnSuites = this.dcnSuites;
        this.getibtcv.dcnSuitesRefreshed = this.dcnSuitesRefreshed;
      }

      else if (entry.suiteName == SuiteDetailType.WAN) {
        
        this.wanSuites = [];
        for (let json of entry.suiteDetails) {
          let wanSuite = new SuiteDetail(json, SuiteDetailType.WAN, this.prospectid);
          this.wanSuites.push(wanSuite);
          this.growthModelingAllSuites.push(wanSuite);
        }
        this.wanSuitesRefreshed = this.wanSuites;
        this.getibtcv.wanSuites = this.wanSuites;
        this.getibtcv.wanSuitesRefreshed = this.wanSuitesRefreshed;
      }
    }
  })
);
}

getIBTCVQtyFromHANA() {
  console.log("in IB TCV QTY HANA  ");
  this.nextGM = false;
  this.apiURL = "/api/cisco1ea/prospect/fetch/ibqtytcv";
  this.body = { "prospectrefid": this.prospectid };
  return this.http.post(this.apiURL, this.body).map((res: Response) => res.json());
}

updateManualQty() {
  this.ngZone.run( () =>
  this.busyConfig.busy = this.getibtcv.updateManualQty(this.getibtcv.growthModelingAllSuites).subscribe((response) => {
    console.log(response);
    if (response.messsage == 'success') {
      console.log('inside');
      //this.submit = true;
      this.refreshManualQty();
    }
  }, err => {
    console.log(err);
  })
);
}

refreshManualQty() {
  this.busyConfig.busy = this.getibtcv.fetchManualQtyData(this.prospectid).subscribe((response) => {    
    this.getibtcv.refreshedManualTCVQty = response;

    for (let entry of response) {
      console.log(entry.suiteName)

      if (entry.suiteName == SuiteDetailType.ACCESS_SWITCHING) {
       
        this.getibtcv.accessSwitchingSuitesRefreshed = [];
        for (let json of entry.suiteDetails) {
          let accessSuite = new SuiteDetail(json, SuiteDetailType.ACCESS_SWITCHING, this.prospectid);
          this.getibtcv.accessSwitchingSuitesRefreshed.push(accessSuite);
        }
        this.getibtcv.growthModelingAllSuites = this.getibtcv.accessSwitchingSuitesRefreshed;
      }

      else if (entry.suiteName == SuiteDetailType.ACCESS_WIRELESS) {
        
        this.getibtcv.accessWirelessSuitesRefreshed = [];
        for (let json of entry.suiteDetails) {
          let accessWirelessSuite = new SuiteDetail(json, SuiteDetailType.ACCESS_WIRELESS, this.prospectid);
          this.getibtcv.accessWirelessSuitesRefreshed.push(accessWirelessSuite);
        }
        this.getibtcv.growthModelingAllSuites = this.getibtcv.accessWirelessSuitesRefreshed;
      }

      else if (entry.suiteName == SuiteDetailType.DATA_CENTER_CENTER) {
        
        this.getibtcv.dccSuitesRefreshed = [];
        for (let json of entry.suiteDetails) {
          let dccSuite = new SuiteDetail(json, SuiteDetailType.DATA_CENTER_CENTER, this.prospectid);
          this.getibtcv.dccSuitesRefreshed.push(dccSuite);
        }
        this.getibtcv.growthModelingAllSuites = this.getibtcv.dccSuitesRefreshed;
      }

      else if (entry.suiteName == SuiteDetailType.DATA_CENTER_NETWORKING) {
        
        this.getibtcv.dcnSuitesRefreshed = [];
        for (let json of entry.suiteDetails) {
          let dcnSuite = new SuiteDetail(json, SuiteDetailType.DATA_CENTER_NETWORKING, this.prospectid);
          this.getibtcv.dcnSuitesRefreshed.push(dcnSuite);
        }
        this.getibtcv.growthModelingAllSuites = this.getibtcv.dcnSuitesRefreshed;
      }

      else if (entry.suiteName == SuiteDetailType.WAN) {
        
        this.getibtcv.wanSuitesRefreshed = [];
        for (let json of entry.suiteDetails) {
          let wanSuite = new SuiteDetail(json, SuiteDetailType.WAN, this.prospectid);
          this.getibtcv.wanSuitesRefreshed.push(wanSuite);
        }
        this.getibtcv.growthModelingAllSuites = this.getibtcv.wanSuitesRefreshed;
      }
    }
  }, err => {
    console.log(err);
  });
}

enterReportEntryFunction(cecid : string) {
  if(cecid != ""){    
  this.cecid = cecid;
  this.nextReportStatus = false;
  this.ngZone.run( () =>
  this.busyConfig.busy = this.growthService.updateManualQty(this.getibtcv.growthModelingAllSuites).subscribe((response) => {
    console.log(response);
    this.reportService.enterReportEntryFunction(this.prospectid,this.cecid).subscribe((response) => {
      console.log(response);
      if (response.messsage == 'success') {
        console.log('inside report');
        this.reportService.getDownloadableReportLinks().subscribe((response) => {
          this.reportLinks = response[0];
          // if (this.reportLinks.STATUS == "Pending"){
          //   console.log("refresh ...  ");
          //   this.reportService.refreshEveryMinute();
          // }          
        })
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
}