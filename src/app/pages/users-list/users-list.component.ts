import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  userList: any[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadUserList();
  }

  loadUserList(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.userList = data.data;
      },
      (error) => {
        console.error('Erro ao carregar lista de usuários:', error);
      }
    );
  }

  createUser() {
    this.router.navigate(['/criar-usuario'])
  }

  viewUserDetails(userId: string): void {
    this.router.navigate(['/detalhes-usuario', userId]);
  }

  deleteUser(userId: string): void {
    this.userService.deleteUser(userId).subscribe(
      () => {
        this.loadUserList();
        this.toastr.success('Usuário excluído com sucesso!');
      },
      (error) => {
        this.toastr.success('Erro ao excluir usuário', error);
      }
    );
  }

  updateUser(userId: string): void{
    this.router.navigate(['/atualizar-dados', userId]);
  }

}
