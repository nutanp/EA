import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import {Subscription} from 'rxjs';

@Component ({
   selector: 'options-page',
   templateUrl : './option.component.html'
})
export class OptionComponent {

    constructor(private http: Http, private router:Router){
    }

    takeMeToStartProspecting(){
        this.router.navigate(['/startProspecting']);
    }

    takeMeToGetProspecting(){
        //this.router.navigate(['/getProspect']);
    }

    takeMeToReportStatus(){
        this.router.navigate(['/reportstatus']);
    }
}

