import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  styles: ``,
  templateUrl: './login.html',
})
export class Login {
  user = new User();
  err: number = 0;
  message: string = 'login ou mot de passe erronés..';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLoggedin(): void {
    this.authService.login(this.user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.err = 1;
        if (err.error?.errorCause == 'disabled') {
          this.message =
            'Utilisateur désactivé, Veuillez contacter votre Administrateur';
        } else {
          this.message = 'login ou mot de passe erronés..';
        }
      },
    });
  }
}

export { Login as LoginComponent };
