import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './components/pages/user-list/user-list.component';
import { UserDetailsComponent } from './components/pages/user-details/user-details.component';
import { CreateUserComponent } from './components/pages/create-user/create-user.component';
import { EditUserComponent } from './components/pages/edit-user/edit-user.component';

const routes: Routes = [
  { path: 'user-list', component: UserListComponent },
  { path: 'user-details', component: UserDetailsComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'user/:id', component: UserDetailsComponent },
  { path: 'edit-user/:id', component: EditUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
