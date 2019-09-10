import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import {MatTabsModule} from '@angular/material'
import {DataTablesModule} from 'angular-datatables';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {EmployeeService} from './employee.service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  //  MatTabsModule,
    BrowserAnimationsModule,
    DataTablesModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
