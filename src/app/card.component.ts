import {Component} from '@angular/core';
import {AppComponent} from './app.component';
import { ReactiveFormsModule  } from '@angular/forms'
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-card',
  template: ` <div class="card" style="text-align:center; font-size:12px ;margin-top:7px;padding:3px;background-color:#e6e6e6;border-radius:5px;">
  <ng-content select=".app-card-data"></ng-content>
  </div> `
})

export class CardComponent{

    public removeCard() : void{

    }

}

