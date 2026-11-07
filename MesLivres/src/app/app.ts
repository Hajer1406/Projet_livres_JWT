import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  title = 'MesLivres';

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.loadToken();
    if (this.authService.getToken() == null || this.authService.isTokenExpired()) {
      this.router.navigate(['/login']);
    }
  }

  onLogout(): void {
    this.authService.logout();
  }
}

export { App as AppComponent };
