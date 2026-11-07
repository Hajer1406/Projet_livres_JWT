import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styles: ``,
  templateUrl: './login.html',
})
export class Login {
  user = new User();
  err: number = 0;

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
      },
    });
  }
}

export { Login as LoginComponent };
