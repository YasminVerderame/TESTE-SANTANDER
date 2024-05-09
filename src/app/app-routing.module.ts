import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';

const routes: Routes = [
  {
    path: '',
    component: UsersListComponent
  },
  {
    path: 'detalhes-usuario/:id',
    component: UserDetailsComponent
  },
  {
    path: 'criar-usuario',
    component: CreateUserComponent
  },
  {
    path: 'atualizar-dados/:id',
    component: UpdateUserComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
