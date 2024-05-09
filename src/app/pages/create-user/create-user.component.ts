import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  user = {
    firstName: '',
    lastName: '',
    email: ''
  };

  isRequesting = false;
  requestSubscription: Subscription | undefined;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.isRequesting) {
      return;
    }

    this.requestSubscription = this.userService.getIsRequesting().subscribe((isRequesting) => {
      this.isRequesting = isRequesting;
    });

    this.userService.createUser(this.user).subscribe(
      (data) => {
        this.toastr.success('Usuário criado com sucesso', data);
        this.user = {
          firstName: '',
          lastName: '',
          email: ''
        };
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      },
      (error) => {
        this.toastr.error('Erro ao criar usuário', error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.requestSubscription) {
      this.requestSubscription.unsubscribe();
    }
  }
}
