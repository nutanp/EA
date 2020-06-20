import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './modal.component';
import { AppComponent } from './app.component';
import {CardComponent} from './card.component';
import {PageComponent} from './page.component';

import {GrowthModelingComponent} from './growthmodeling.component';
import {SearchComponent} from './search.component';
import { OptionComponent } from './option.component';
import { MyDatePickerModule } from 'mydatepicker';
import { RouterModule, Routes } from '@angular/router';
import {BusyModule} from 'angular2-busy';
import {GrowthModelingService} from './service/growthModeling.service';
import {GetReportService} from './service/getReport.service';
import { ReportStatus } from './reportstatus.component';
import {CreateProspectIDService} from './service/createProspectId.service';
import {GetProspectService} from './service/getProspect.service';
import {DirectiveComponent} from './directive.component'
import {DiscountValidatorDirective} from './validator.directive';
import {ExistingProspectComponent} from './existingProspect.component';
import {GetIBTCVQtyService} from './service/getIBTCVQty.service';

const appRoutes: Routes = [
  { path: '', component: OptionComponent },
  { path: 'startProspecting', component: PageComponent },
  { path: 'reportstatus', component: ReportStatus},
  { path:'getProspect/:prospectid', component: ExistingProspectComponent },
  { path:'tableausource', component: GrowthModelingComponent},
  { path: 'existingprospect', component: SearchComponent},
  { path: 'GrowthModeling/:GUName/:flowNumber/:preselectedGUIDs/:prospectID', component: GrowthModelingComponent }
];

@NgModule({
  declarations: [
    AppComponent,ModalComponent, CardComponent, PageComponent, DiscountValidatorDirective, DirectiveComponent,
    GrowthModelingComponent,SearchComponent, OptionComponent,ReportStatus,ExistingProspectComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,  
    BootstrapModalModule,
    FormsModule,
    RouterModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BusyModule,
    MyDatePickerModule 
  ],
  providers: [GrowthModelingService,GetReportService,GetProspectService,ReportStatus,CreateProspectIDService,ExistingProspectComponent,
    PageComponent,GrowthModelingComponent,GetIBTCVQtyService,SearchComponent,OptionComponent,ModalComponent,CardComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }
