import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnDestroy {
  userId: string | null = null;
  originalUser: any;
  user = {
    firstName: '',
    lastName: '',
    email: ''
  };

  isRequesting = false;
  requestSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute, 
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
      this.loadUserDetails();
    });
  }

  loadUserDetails(): void {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe(
        (data) => {
          this.originalUser = data;
          this.user = { ...data };
        },
        (error) => {
          console.error('Erro ao carregar detalhes do usuário:', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.isRequesting) {
      return;
    }

    this.requestSubscription = this.userService.getIsRequesting().subscribe((isRequesting) => {
      this.isRequesting = isRequesting;
    });

    if (this.userId) {
      this.userService.updateUser(this.userId, this.user).subscribe(
        (data) => {
          this.originalUser = { ...this.user };
          this.toastr.success('Usuário atualizado com sucesso', 'Sucesso!');
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
        },
        (error) => {
          console.error('Erro ao atualizar usuário:', error);
          this.toastr.error('Ocorreu um erro ao atualizar seus dados', 'Erro!');
        }
      );
    }
  }

  formChanged(): boolean {
    return JSON.stringify(this.user) !== JSON.stringify(this.originalUser);
  }

  ngOnDestroy(): void {
    if (this.requestSubscription) {
      this.requestSubscription.unsubscribe();
    }
  }
}
