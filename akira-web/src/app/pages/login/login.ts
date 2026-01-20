import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserInfo } from '../../core/models/user-info';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  loginData: UserInfo = {
    email: '',
    password: '' // Note: Legacy interface might accept password but UserInfo definition I made didn't explicitly include it. 
                 // I should check the legacy interface again or just add it to my model.
  };
  isLoading = false;
  errorMsg = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.loginData.email || !this.loginData.password) return;
    
    this.isLoading = true;
    this.errorMsg = '';

    this.auth.login(this.loginData).subscribe({
      next: () => {
        this.isLoading = false;
        // Router navigate handled in service, but can be done here too.
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMsg = err.error?.message || 'Login failed. Please check your credentials.';
      }
    });
  }
}
