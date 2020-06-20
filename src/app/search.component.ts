import { Component,NgZone } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RouterModule, Routes, Router, ActivatedRoute, Params } from '@angular/router';
import {GetProspectService} from './service/getProspect.service';
import { BUSY_CONFIG_DEFAULTS, IBusyConfig } from "angular2-busy";
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { getBusyConfig } from "./ciscospinner";
import { SuiteDetail, SuiteDetailType } from './model/suiteDetail.model';
import { GrowthModelingService } from './service/growthModeling.service';
import { GetIBTCVQtyService } from './service/getIBTCVQty.service';
import { OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'search-page',
  templateUrl: './search.component.html'
})

export class SearchComponent{

    searchTextVal: any;
    data: any = "" ;
    dataProspectName : any ;
    private apiURL = "";
    body : any = {};
    dataCRGUID : any ;
    dataCRGUName : any ;
    //host : string = "";
    busyConfig: IBusyConfig = getBusyConfig();
    loadTCVExisting : any = {};
    accessSwitchingSuites: SuiteDetail[] = [];
    accessSwitchingSuitesRefreshed: SuiteDetail[] = [];
    edited : boolean = false;

    pidbutton : boolean = false;
    pnamebutton : boolean = false;
    guidbutton : boolean = false;
    gunamebutton : boolean = false;

    showGetProspectTable : boolean = false;
  
    prospectid : string = "";
    prospectname : string = "";
    guid : string = "";
    guname : string = "";

    secondsDisplay : number = 0;
    sub : Subscription;

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
    
    constructor(private http: Http, private router: Router, private gps : GetProspectService,
         private getibtcv : GetIBTCVQtyService, private ngZone : NgZone) {
        
    }
    ticks = 0;
    private startTimer(){
        let timer = Observable.timer(1,1000);
        this.busyConfig.busy = timer.subscribe(
            t => {
                this.ticks = t;
                this.secondsDisplay = this.getSeconds(this.ticks);
                if(this.getSeconds(this.ticks) == 45){
                    
                }
            }
        )        
    }

    private getSeconds(ticks : number){
        return this.pad(ticks%60);
    }

    private pad(digit: any){
        return digit <=9 ? '0' + digit : digit;
    }

    // To load all the data for exisitng prospects //
    getByProspectID(prospectid:string){
        this.edited = true;
        this.startTimer();
        this.getibtcv.getByProspectID(prospectid);
        // setTimeout(function() {
        //     this.edited = false;
        //     console.log(this.edited);
        // }.bind(this), 50000);
    }

    onSelectionChange(id:string) {       
        if(id == "pid"){
            this.pidbutton = true;
            this.pnamebutton = false;
            this.guidbutton = false;
            this.gunamebutton = false;
            this.prospectname = "";
            this.guname = "";
            this.guid = "";
        }
        else if(id == "pname"){
            this.pnamebutton = true;
            this.pidbutton = false;
            this.gunamebutton = false;
            this.guidbutton = false;
            this.prospectid = "";
            this.guname = "";
            this.guid = "";
        }
        else if(id == "guname"){
            this.gunamebutton = true;
            this.pidbutton = false;
            this.pnamebutton = false;
            this.guidbutton = false;
            this.prospectname = "";
            this.prospectid = "";
            this.guid = "";
        }
        else if(id == "guid"){
            this.guidbutton = true;
            this.pidbutton = false;
            this.pnamebutton = false;
            this.gunamebutton = false;
            this.prospectname = "";
            this.guname = "";
            this.prospectid = "";
        }
      }
    
    searchByProspectID(searchVal : string){
        this.searchTextVal = searchVal;
        console.log("inside search");
        console.log("SEARCH TEXT : " + this.searchTextVal);
        this.apiURL = '/api/cisco1ea/prospect/search/byid';
        this.ngZone.run( () =>
        this.busyConfig.busy = this.getDataForSearchByProspectID().subscribe(data => { this.data = data;
            if(this.data != ""){
                this.showGetProspectTable = true;
            }
            console.log("****" + data[0].PROSPECT_REFERENCE_NAME);
        })
    );        
    }

    getDataForSearchByProspectID(){
        this.body = { "prospectid": this.searchTextVal };
        return this.http.post(this.apiURL, this.body).map((res: Response) => res.json());
    }

    searchByProspectName(searchVal : string){
        this.searchTextVal = searchVal;
        console.log("inside search");
        console.log("SEARCH TEXT : " + this.searchTextVal);
        this.apiURL = '/api/cisco1ea/prospect/search/byname';
        this.ngZone.run( () =>
        this.busyConfig.busy = this.getDataForSearchByProspectName().subscribe(data => { this.dataProspectName = data;
            if(data != ""){
                this.showGetProspectTable = true;
            }
         })
        );        
    }

    getDataForSearchByProspectName(){
        this.body = { "prospectname": this.searchTextVal };
        return this.http.post(this.apiURL, this.body).map((res: Response) => res.json());
    }

    searchByCRGUID(searchVal : string){
        this.searchTextVal = searchVal;
        console.log("inside search");
        console.log("SEARCH TEXT : " + this.searchTextVal);
        this.apiURL = '/api/cisco1ea/prospect/search/bycrguid';
        this.ngZone.run( () =>
        this.busyConfig.busy = this.getDataForSearchByCRGUID().subscribe(data => { this.dataCRGUID = data;
            if(data != ""){
                this.showGetProspectTable = true;
            }
         })
        );  
    }

    getDataForSearchByCRGUID(){
        this.body = { "crguid": this.searchTextVal };
        return this.http.post(this.apiURL, this.body).map((res: Response) => res.json());
    }

    searchByCRGUName(searchVal : string){
        this.searchTextVal = searchVal;
        console.log("inside search");
        console.log("SEARCH TEXT : " + this.searchTextVal);
        this.apiURL = '/api/cisco1ea/prospect/search/bycrguname';
        this.ngZone.run( () =>
        this.busyConfig.busy = this.getDataForSearchByCRGUName().subscribe(data => { this.dataCRGUName = data;
            if(data != ""){
                this.showGetProspectTable = true;
            }        
        })
    );        
    }

    getDataForSearchByCRGUName(){
        this.body = { "crguname": this.searchTextVal };
        return this.http.post(this.apiURL, this.body).map((res: Response) => res.json());
    }

    // ngOnDestroy(): void {
    //     this.sub.unsubscribe();
    //   }
}