import { Injectable } from "@angular/core";
import { Component,NgZone } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SuiteDetail, SuiteDetailType } from '../model/suiteDetail.model';
import { Observable } from 'rxjs/Rx';
import { GetProspectService } from './getProspect.service';
import { ExistingProspectComponent } from '../existingProspect.component';
import { BUSY_CONFIG_DEFAULTS, IBusyConfig } from "angular2-busy";

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { getBusyConfig } from "../ciscospinner";

@Injectable()
export class GetIBTCVQtyService {

    constructor(private http: Http, private gps: GetProspectService, private ngZone : NgZone) {
    }

    //host: string = "";
    fetchIBTCVQtyURL: string =  "/api/cisco1ea/prospect/save/manualqtytcv";
    updateManualQtyURL: string = "/api/cisco1ea/prospect/save/manualqtytcv";
    apiURL: string = "";
    body: any = {};
    busyConfig: IBusyConfig = getBusyConfig();
    fetchManualQty: any = {};
    loadTCVExisting: any = {};
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

    getByProspectID(prospectid: string) {
        this.busyConfig.busy = this.loadIBTCVforExistingProspect(prospectid).subscribe(data => {
            this.loadTCVExisting = data;
            this.ngZone.run( () =>
            this.fetchManualQtyData(prospectid).subscribe(dataM => {
                this.fetchManualQty = dataM;
                for (let entry of this.loadTCVExisting) {
                    console.log("suite name ::::   " + entry.suiteName)
                    if (entry.suiteName == SuiteDetailType.ACCESS_SWITCHING) {
                        this.accessSwitchingSuites = [];
                        for (let json of entry.suiteDetails) {
                            let accessSuite = new SuiteDetail(json, SuiteDetailType.ACCESS_SWITCHING, prospectid);
                            this.accessSwitchingSuites.push(accessSuite);
                            this.growthModelingAllSuites.push(accessSuite);
                        }
                    }

                    else if (entry.suiteName == SuiteDetailType.ACCESS_WIRELESS) {
                        this.accessWirelessSuites = [];
                        for (let json of entry.suiteDetails) {
                            let accessWirelessSuite = new SuiteDetail(json, SuiteDetailType.ACCESS_WIRELESS, prospectid);
                            this.accessWirelessSuites.push(accessWirelessSuite);
                            this.growthModelingAllSuites.push(accessWirelessSuite);
                        }
                    }

                    else if (entry.suiteName == SuiteDetailType.DATA_CENTER_CENTER) {
                        this.dccSuites = [];
                        for (let json of entry.suiteDetails) {
                            let dccSuite = new SuiteDetail(json, SuiteDetailType.DATA_CENTER_CENTER, prospectid);
                            this.dccSuites.push(dccSuite);
                            this.growthModelingAllSuites.push(dccSuite);
                        }
                    }

                    else if (entry.suiteName == SuiteDetailType.DATA_CENTER_NETWORKING) {
                        this.dcnSuites = [];
                        for (let json of entry.suiteDetails) {
                            let dcnSuite = new SuiteDetail(json, SuiteDetailType.DATA_CENTER_NETWORKING, prospectid);
                            this.dcnSuites.push(dcnSuite);
                            this.growthModelingAllSuites.push(dcnSuite);
                        }
                    }

                    else if (entry.suiteName == SuiteDetailType.WAN) {
                        this.wanSuites = [];
                        for (let json of entry.suiteDetails) {
                            let wanSuite = new SuiteDetail(json, SuiteDetailType.WAN, prospectid);
                            this.wanSuites.push(wanSuite);
                            this.growthModelingAllSuites.push(wanSuite);
                        }
                    }
                }

                this.growthModelingAllSuites = [];
                for (let entry of this.fetchManualQty) {
                    if (entry.suiteName == SuiteDetailType.ACCESS_SWITCHING) {
                        this.accessSwitchingSuitesRefreshed = [];
                        for (let json of entry.suiteDetails) {
                            let accessSuite = new SuiteDetail(json, SuiteDetailType.ACCESS_SWITCHING, prospectid);
                            this.accessSwitchingSuitesRefreshed.push(accessSuite);
                            this.growthModelingAllSuites.push(accessSuite);
                        }                        
                    }

                    else if (entry.suiteName == SuiteDetailType.ACCESS_WIRELESS) {
                        this.accessWirelessSuitesRefreshed = [];
                        for (let json of entry.suiteDetails) {
                            let accessWirelessSuite = new SuiteDetail(json, SuiteDetailType.ACCESS_WIRELESS, prospectid);
                            this.accessWirelessSuitesRefreshed.push(accessWirelessSuite);
                            this.growthModelingAllSuites.push(accessWirelessSuite);
                        }                        
                    }

                    else if (entry.suiteName == SuiteDetailType.DATA_CENTER_CENTER) {
                        this.dccSuitesRefreshed = [];
                        for (let json of entry.suiteDetails) {
                            let dccSuite = new SuiteDetail(json, SuiteDetailType.DATA_CENTER_CENTER, prospectid);
                            this.dccSuitesRefreshed.push(dccSuite);
                            this.growthModelingAllSuites.push(dccSuite);
                        }                     
                    }

                    else if (entry.suiteName == SuiteDetailType.DATA_CENTER_NETWORKING) {
                        this.dcnSuitesRefreshed = [];
                        for (let json of entry.suiteDetails) {
                            let dcnSuite = new SuiteDetail(json, SuiteDetailType.DATA_CENTER_NETWORKING, prospectid);
                            this.dcnSuitesRefreshed.push(dcnSuite);
                            this.growthModelingAllSuites.push(dcnSuite);
                        }                        
                    }

                    else if (entry.suiteName == SuiteDetailType.WAN) {
                        this.wanSuitesRefreshed = [];
                        for (let json of entry.suiteDetails) {
                            let wanSuite = new SuiteDetail(json, SuiteDetailType.WAN, prospectid);
                            this.wanSuitesRefreshed.push(wanSuite);
                            this.growthModelingAllSuites.push(wanSuite);
                        }                        
                    }
                }
                this.gps.getByProspectID(prospectid);
            })
        );
        })
    }

    loadIBTCVforExistingProspect(prospectid: string) {
        return this.http.post('/api/cisco1ea/prospect/fetch/ibqtytcv', { "prospectrefid": prospectid }).map((res: Response) => res.json());
    }

    public updateManualQty(suites: SuiteDetail[]): Observable<any>{
        console.log("in service ts :::  " + suites);
        return this.http.post(this.updateManualQtyURL, suites)
            .map((response)=>{
                console.log(response);
                return response.json();
            })//.catch(this.handleError)
    }

    fetchManualQtyData(prospectid) {
        return this.http.post('/api/cisco1ea/prospect/fetch/manualqtytcv', { "prospectrefid": prospectid }).map((res: Response) => res.json());
    }
}
