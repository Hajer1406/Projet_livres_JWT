import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-verif-email',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './verif-email.html',
  styleUrl: './verif-email.css',
})
export class VerifEmailComponent implements OnInit {
  code: string = '';
  user: User = new User();
  err = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.regitredUser;
  }

  onValidateEmail() {
    this.authService.validateEmail(this.code).subscribe({
      next: (res) => {
        alert('Login successful');
        this.authService.login(this.user).subscribe({
          next: (data) => {
            let jwToken = data.headers.get('Authorization')!;
            this.authService.saveToken(jwToken);
            this.router.navigate(['/']);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      },
      error: (err: any) => {
        if (err.error?.errorCode == 'INVALID_TOKEN') {
          this.err = 'Code invalide!';
        } else if (err.error?.errorCode == 'EXPIRED_TOKEN') {
          this.err = 'Code a expiré!';
        } else if (err.status == 400 || err.status == 404) {
          this.err = err.error?.message || 'Erreur lors de la validation';
        } else {
          this.err = err.error?.message || 'Erreur serveur';
        }
        console.log(err.error?.errorCode);
      },
    });
  }
}

export { VerifEmailComponent as VerifEmail };

