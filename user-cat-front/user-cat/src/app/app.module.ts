import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/app-users/users.component';
import { ListUserComponent } from './components/app-list-user/list-user.component';
import { AddUserComponent } from './components/app-add-user/add-user.component';
import { BulkImportComponent } from './components/app-bulk-import/bulk-import.component';
import { HeaderComponent } from './components/app-header/header.component';
import {ListUserResolver} from './services/all-user-resolver.service'
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
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
    NgxPaginationModule ,
    FormsModule,
    NgxSkeletonLoaderModule
  ],
  providers: [ListUserResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
