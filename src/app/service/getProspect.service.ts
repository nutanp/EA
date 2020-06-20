import { Injectable } from "@angular/core";
import { Component,NgZone } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable,Subscription} from 'rxjs/Rx';
import { RouterModule, Routes, Router, ActivatedRoute, Params } from '@angular/router';
import { BUSY_CONFIG_DEFAULTS, IBusyConfig } from "angular2-busy";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { getBusyConfig } from "../ciscospinner";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class GetProspectService{
    constructor(private http: Http, private router: Router, private ngZone: NgZone) {
        console.log('Hello !!!');
    }

    apiURL : string = "";
    body : any = {};
    //host : string = "";
    dataProspectName : any = {};
    PROSPECT_REFERENCE_NAME : string = "";
    ORIGINAL_CR_GU_ID : string = "";
    ORIGINAL_CR_GU_NAME : string = "";
    suiteData : any = {};
    growthParam : any = {};
    busyConfig: IBusyConfig = getBusyConfig();
    ADDT_CR_GU_ID : any = "";
    ADDT_CR_HQ_ID :  any = "" ;
    ADDT_INSTALL_SITE_CR_PARTY_ID : any ="" ;
    ADDT_CR_GU_NAME : any = "";
    ADDT_CR_HQ_NAME : any = "";
    ADDT_INSTALL_SITE_CR_PARTY_NAME : any = "";
    //ADDT_CR_GU_IDArray : string[] =  [];
    selectedSuites : string = "";
    showHide: boolean;
    showCardsVar: boolean = false;
    guCards : boolean = false;
    hqCards : boolean = false;
    isCards : boolean = false;
    dataGetCountry : any ;
    
    getByProspectID(prospectid:string){
        this.apiURL = "/api/cisco1ea/customer/definition";
        this.body = {"prospectrefid": prospectid};
        this.ngZone.run( () =>
        this.busyConfig.busy = this.getDataforCustomerDef().subscribe(data => { this.dataProspectName = data;
            this.PROSPECT_REFERENCE_NAME  = this.dataProspectName[0].PROSPECT_REFERENCE_NAME;
            this.ORIGINAL_CR_GU_ID = this.dataProspectName[0].ORIGINAL_CR_GU_ID;
            this.ORIGINAL_CR_GU_NAME = this.dataProspectName[0].ORIGINAL_CR_GU_NAME;

            this.ADDT_CR_GU_ID = this.dataProspectName[0].ADDT_CR_GU_ID;    
            console.log("add_cr_gu-id     " + this.ADDT_CR_GU_ID)        
            if(this.ADDT_CR_GU_ID != null){
                //this.ADDT_CR_GU_ID.substring(1,this.ADDT_CR_GU_ID.length);
                this.ADDT_CR_GU_ID = this.ADDT_CR_GU_ID.split(",");
                this.ADDT_CR_GU_NAME = this.dataProspectName[0].ADDT_CR_GU_NAME;
            }
            if(this.ADDT_CR_GU_NAME != null){
                //this.ADDT_CR_GU_NAME.substring(1,this.ADDT_CR_GU_NAME.length);
                this.ADDT_CR_GU_NAME = this.ADDT_CR_GU_NAME.split(";");
            }
            
            this.ADDT_CR_HQ_ID = this.dataProspectName[0].ADDT_CR_HQ_ID;   
            console.log("hq ids ::::  " + this.ADDT_CR_HQ_ID);         
            if(this.ADDT_CR_HQ_ID != null){            
                this.ADDT_CR_HQ_ID = this.ADDT_CR_HQ_ID.split(",");
                this.ADDT_CR_HQ_NAME = this.dataProspectName[0].ADDT_CR_HQ_NAME;               
            }
            if(this.ADDT_CR_HQ_NAME != null){
                this.ADDT_CR_HQ_NAME = this.ADDT_CR_HQ_NAME.split(";");
            }

            this.ADDT_INSTALL_SITE_CR_PARTY_ID = this.dataProspectName[0].ADDT_INSTALL_SITE_CR_PARTY_ID;
            if(this.ADDT_INSTALL_SITE_CR_PARTY_ID != null){
                this.ADDT_INSTALL_SITE_CR_PARTY_ID = this.ADDT_INSTALL_SITE_CR_PARTY_ID.split(",");
                this.ADDT_INSTALL_SITE_CR_PARTY_NAME = this.dataProspectName[0].ADDT_INSTALL_SITE_CR_PARTY_NAME;                
            }
            if(this.ADDT_INSTALL_SITE_CR_PARTY_NAME != null){
                this.ADDT_INSTALL_SITE_CR_PARTY_NAME = this.ADDT_INSTALL_SITE_CR_PARTY_NAME.split(";");
            }

            if(this.ADDT_CR_HQ_ID != "" || this.ADDT_CR_GU_ID != "" || this.ADDT_INSTALL_SITE_CR_PARTY_ID != "")
            {
                this.showCardsVar = true;
            }

            if(this.ADDT_CR_GU_ID != null){this.guCards=true};
            if(this.ADDT_CR_HQ_ID != null){this.hqCards=true};

            if(this.ADDT_INSTALL_SITE_CR_PARTY_ID != null)
            {this.isCards=true};

            this.getSuiteInfoData(prospectid).subscribe(data=>{ this.suiteData = data;
                this.selectedSuites = this.suiteData.V_GROWTH_PARAM_VALUE;
                console.log("preselected suites  ::::   " + this.suiteData.V_GROWTH_PARAM_VALUE);
                    this.getGrowthParams(prospectid).subscribe(data => {
                    this.growthParam = data;                    
                    this.http.post('/api/cisco1ea/prospect/fetch/countryoftxn', '').
                    map((res: Response) => res.json()).subscribe(dataGetCountry => { this.dataGetCountry = dataGetCountry;                        
                            this.router.navigate(['/getProspect', prospectid]);
                        })
                    });                    
                })           
        })
    );
    }

    getDataforCustomerDef(){
        return this.http.post(this.apiURL, this.body).map((res: Response) => res.json());
    }

    getSuiteInfoData(prospectid){
        return this.http.post('/api/cisco1ea/prospect/fetch/suiteinfo', {"prospectrefid": prospectid}).map((res: Response) => res.json());
    }

    getGrowthParams(prospectid){
        return this.http.post('/api/cisco1ea/prospect/fetch/growthparam', {"prospectrefid": prospectid}).map((res: Response) => res.json());
    }
}