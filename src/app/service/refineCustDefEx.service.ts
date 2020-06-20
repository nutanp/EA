import { Injectable } from "@angular/core";
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
export class RefineCustDefExService{
    constructor(private http: Http, private router: Router) {
        console.log('Hello !!!');
    }

}