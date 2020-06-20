import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import {SuiteDetail, SuiteDetailType} from '../model/suiteDetail.model';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class GrowthModelingService{

    constructor(private http: Http){

    }

    //host: string = "";

    updateManualQtyURL: string = "/api/cisco1ea/prospect/save/manualqtytcv";
    fetchMaunalQtyURL : string = "/api/cisco1ea/prospect/fetch/manualqtytcv";

    public updateManualQty(suites: SuiteDetail[]): Observable<any>{
        console.log("in service ts :::  " + suites);
        return this.http.post(this.updateManualQtyURL, suites)
            .map((response)=>{
                console.log(response);
                return response.json();
            })//.catch(this.handleError)
    }

    public getManualQty(prospectId: string): Observable<any>{
        return this.http.post(this.fetchMaunalQtyURL, {"prospectrefid": prospectId})
            .map((response)=>{
                return response.json();
            })//.catch(this.handleError)
    }
    
    private handleError(error: any) : Promise<any>{
        return Promise.reject(error.message || error);
    }

}