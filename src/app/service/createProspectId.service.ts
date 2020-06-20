import { Injectable } from "@angular/core";
import { Component,NgZone } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable,Subscription} from 'rxjs/Rx';
import { BUSY_CONFIG_DEFAULTS, IBusyConfig } from "angular2-busy";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { getBusyConfig } from "../ciscospinner";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class CreateProspectIDService{
    constructor(private http: Http, private ngZone : NgZone){
    }

    apiURL : string ="";
    body : any = {};
    dataCreateProspect : any = {};
    public prospectID : string = "";
    busy: Subscription;
    searchTextVal : string = "";
    data : any = {};
    preselectedGUIDs : string = "";
    busyConfig: IBusyConfig = getBusyConfig();
    
    startProspecting(guname : string) {
        console.log("here");    
        this.ngZone.run( () =>
        this.busyConfig.busy = this.createProspectID(guname).subscribe(data => { this.dataCreateProspect = data;
        //   for (let entry of this.dataCreateProspect) {
            this.prospectID = this.dataCreateProspect[0].PROSPECT_REFERENCE_ID;
            console.log("&&& " + this.prospectID); 
            this.getGUIDs(guname);
          //}
        })
      );
    }

    createProspectID(guname:string) {
        this.apiURL = "/api/cisco1ea/prospect/create";
        this.body = { "offername": "C1", "prospectrefname": "", "guname": guname, "guids": "" };
        return this.http.post(this.apiURL, this.body).map((res: Response) => res.json());
      }

      getGUIDs(searchVal: string) {
        this.searchTextVal = searchVal;
        console.log("inside search");
        console.log("SEARCH TEXT : " + this.searchTextVal);
        this.ngZone.run( () =>
        this.busyConfig.busy = this.searchByGUName().subscribe(data => { this.data = data ;
        this.preselectedGUIDs = this.data[0].INSTALL_SITE_CR_GU_ID;
        console.log("zzzzzz "+this.preselectedGUIDs);
        })
      );
        
      }
    
      searchByGUName() {
        console.log("inside search by gu name");
        this.body = { "crguname": this.searchTextVal };
        return this.http.post("/api/cisco1ea/prospect/fetch/pretcv/guidsbycrguname", this.body).map((res: Response) => res.json());
      }
}