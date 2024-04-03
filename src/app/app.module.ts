import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from'@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamDetailsComponent } from './components/team-details/team-details.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    TeamDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
