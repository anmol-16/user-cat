import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { BulkImportComponent } from './components/bulk-import/bulk-import.component';
import { ListUserResolver } from './services/all-user-resolver.service';
import {ListUserComponent} from './components/list-user/list-user.component';
import { UsersComponent } from './components/users/users.component';


const routes: Routes = [
  {path:'', component:ListUserComponent, resolve:{listUser:ListUserResolver}},
  {path:'user-detail', component:UsersComponent},
  {path:'add-new-user', component:AddUserComponent},
  {path:'bulk-import', component:BulkImportComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
