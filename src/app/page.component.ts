import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Subscription} from 'rxjs';
import { GrowthModelingComponent } from './growthmodeling.component';
import { RouterModule, Routes, Router, ActivatedRoute, Params } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html'
})
export class PageComponent {

  private apiURL = '/api/cisco1ea/prospect/search/pretcv/bycrguname';

  data: any = {};
  dataCreateProspect: any = {}
  selectedEntry: any;
  body: any = {};
  searchTextVal: any;
  disableStartProspecting: boolean = true;
  disableNewProspect: boolean = true;

  thirdOption: boolean = false;
  guids: any;
  prospectID: any;
  radio : any;
  busy: Subscription;

  // ngOnInit(){
  //   this.busy = this.http.get('...').subscribe();
  // }

  constructor(private http: Http, private router: Router) {
    console.log('Hello !!!');
  }

  search(searchVal: string) {
    this.searchTextVal = searchVal;
    console.log("inside search");
    console.log("SEARCH TEXT : " + this.searchTextVal);
    this.busy = this.searchByGUName().subscribe(data => { this.data = data });
    console.log("data ::::: " + this.data);
  }

  searchByGUName() {
    console.log("inside search by gu name");
    this.body = { "crguname": this.searchTextVal };
    return this.http.post(this.apiURL, this.body).map((res: Response) => res.json());
  }

  startProspecting() {
    console.log("here");
    //console.log("radio :::: " + this.selectedEntry);
    this.thirdOption = true;
    //console.log("THIRD OPTION ::::   " + this.thirdOption);

    this.getDataFromStartProspecting().subscribe(data => { this.dataCreateProspect = data;
      for (let entry of this.dataCreateProspect) {
        this.prospectID = entry.PROSPECT_REFERENCE_ID;
        console.log("&&& " + entry.PROSPECT_REFERENCE_ID); 
      }
      //this.router.navigate(['/GrowthModeling', this.selectedEntry, this.thirdOption, this.guids, this.prospectID]);
    })
  }

  getProspect(){
    this.router.navigate(['/Option2']);
  }

  getDataFromStartProspecting() {
    this.apiURL = "/api/cisco1ea/prospect/create";
    this.body = { "offername": "C1", "prospectrefname": "test", "guname": this.selectedEntry, "guids": this.guids };
    return this.http.post(this.apiURL, this.body).map((res: Response) => res.json());
  }

  onSelectionChange(guname, guids) {
    this.selectedEntry = guname;
    this.guids = guids;
    this.disableStartProspecting = false;
    console.log("gu ids :::  " + guids)
  }

  onGUNamesave(radiogu){
    this.radio = radiogu;
    console.log("print:: " + this.radio);
    if(this.radio == "guradio"){
      this.searchByGUName();
    }
    else if(this.radio == "guidradio"){
      
    }
    else if(this.radio == "prospectidradio"){

    }
    else if(this.radio == "prospectnameradio"){

    }
  }
}
