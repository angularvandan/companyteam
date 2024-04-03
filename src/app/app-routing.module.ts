import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { TeamDetailsComponent } from './components/team-details/team-details.component';

const routes: Routes = [
  {path:"",component:UserListComponent},
  {path:"user-list",component:UserListComponent},
  {path:"team-details",component:TeamDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
