import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { BulkImportComponent } from './components/bulk-import/bulk-import.component';
import { HeaderComponent } from './components/header/header.component';
import {ListUserResolver} from './services/all-user-resolver.service'
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ListUserComponent,
    AddUserComponent,
    BulkImportComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule 
  ],
  providers: [ListUserResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
