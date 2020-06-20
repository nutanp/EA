import {GetReportService} from './service/getReport.service';
import { Component, ViewContainerRef, NgZone } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Subscription} from 'rxjs';
import { GrowthModelingComponent } from './growthmodeling.component';
import { RouterModule, Routes, Router, ActivatedRoute, Params } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@Component({
    selector: 'app-reporr',
    templateUrl: './reportstatus.component.html'
  })
export class ReportStatus {

    constructor(private reportService: GetReportService, private router: Router, private ngZone : NgZone){
    }
    reportLinks: any;
    searchText : string;
    showreporttable : boolean = false;
    url : string;
    IBA_DOCUMENT_NAME : string;
    TCV_TCO_DOCUMENT_NAME : string;

    getReportStatusForProspectID(searchText : string){
        this.searchText = searchText;
        this.ngZone.run( () =>
            this.reportService.getReportStatusForProspectID(this.searchText).subscribe((response) => {
              this.reportLinks = response[0];
              if(this.reportLinks){
                this.showreporttable = true;
            }
              console.log(this.reportLinks);
              console.log(response)
              this.IBA_DOCUMENT_NAME = this.reportLinks.IBA_DOCUMENT_NAME;
              let index = this.IBA_DOCUMENT_NAME.lastIndexOf('/');
              this.IBA_DOCUMENT_NAME = this.IBA_DOCUMENT_NAME.substring(index+1);
              
              this.TCV_TCO_DOCUMENT_NAME = this.reportLinks.TCV_TCO_DOCUMENT_NAME;
              index = this.TCV_TCO_DOCUMENT_NAME.lastIndexOf('/');
              this.TCV_TCO_DOCUMENT_NAME = this.TCV_TCO_DOCUMENT_NAME.substr(index+1);
          })
        );
        }

        downloadLink(url : string){
            window.open(url);
            return false;     
        }
    }