import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms'; // Import FormsModule
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Import NgbModule

import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from './pipes/date.pipe';
import { AgePipe } from './pipes/age.pipe';
import { IsactivePipe } from './pipes/isactive.pipe';
import { TrndtePipe } from './pipes/trndte.pipe';
import { DocnumPipe } from './pipes/docnum.pipe';
import { Date2Pipe } from './pipes/date2.pipe'; 

@NgModule({
  declarations: [
    AppComponent,
    DatePipe,
    AgePipe,
    IsactivePipe,
    TrndtePipe,
    DocnumPipe,
    Date2Pipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
