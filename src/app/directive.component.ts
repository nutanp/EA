//app.component.ts

import {Component, OnInit } from '@angular/core';

@Component({
  selector: 'app',
   templateUrl: 'growthmodeling.component.html'

})

export class DirectiveComponent implements OnInit {

  accesswirelessCheck =  true
  constructor() {
  }

  ngOnInit() { }
}