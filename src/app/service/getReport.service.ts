import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import {SuiteDetail, SuiteDetailType} from '../model/suiteDetail.model';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class GetReportService{

    constructor(private http: Http){
    }

    prospectID : string;
    cecid : string;
    count = 0;
    //host: string = "";
    body : any;
    enterReportEntry: string =  "/api/cisco1ea/prospect/fetch/report";
    generateDownloadablelinks :  string = "/api/cisco1ea/prospect/fetch/reportstatus";
    
    
    public enterReportEntryFunction(prospectID : string, cecid:string){
        this.prospectID = prospectID;        
        this.body = {
            "prospectrefid": prospectID,
            "cecUser": cecid ,
           "createdBy": "saprasa2",
           "updatedBy": "saprasa2"
        }
        return this.http.post(this.enterReportEntry,this.body)
            .map((response)=>{
                console.log(response);
                return response.json();
            })
    }

    public getDownloadableReportLinks(){
        this.body = {"prospectrefid": this.prospectID};
        console.log(this.count++);
        return this.http.post(this.generateDownloadablelinks,this.body)
        .map((response)=>{
            console.log(response);
            return response.json();
        })
    }

    public getReportStatusForProspectID(prospectID : string){
        this.prospectID = prospectID
        this.body = {"prospectrefid": this.prospectID};
        console.log(this.count++);
        return this.http.post(this.generateDownloadablelinks,this.body)
        .map((response)=>{
            console.log(response);
            return response.json();
        })
    }

    // refreshEveryMinute(){
    //     Observable.interval(1000 * 60).subscribe(x =>{
    //         this.getDownloadableReportLinks();
    //     })
    // }
}