import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  userId: string | null = null; 
  userDetails: any;

  constructor(
    private route: ActivatedRoute, 
    private userService: UserService,
    private router: Router,
  ) { }

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
          this.userDetails = data;
        },
        (error) => {
          console.error('Erro ao carregar detalhes do usuário:', error);
        }
      );
    } else {
      console.error('ID do usuário é nulo.');
    }
  } 
  
  goBack(): void {
    this.router.navigate(['/']);
  }
}
