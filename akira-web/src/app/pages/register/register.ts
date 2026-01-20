import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserInfo } from '../../core/models/user-info';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {
  registerData: UserInfo = {
    username: '',
    email: '',
    password: ''
  };
  isLoading = false;
  errorMsg = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.registerData.email || !this.registerData.password || !this.registerData.username) return;
    
    this.isLoading = true;
    this.errorMsg = '';

    const payload = {
      username: this.registerData.username,
      email: this.registerData.email,
      password: this.registerData.password,
      role: 'USER', // Default role
      tmdb_key: '113b9c813e2749e6edd312ae164e46f6' // Required by backend DTO
    };

    this.auth.register(payload).subscribe({
      next: () => {
        this.isLoading = false;
        // Navigation to login handled in service or here. Service does it currently.
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Registration Error:', err);
        
        if (err.error?.message) {
          if (Array.isArray(err.error.message)) {
             this.errorMsg = err.error.message.join(', ');
          } else {
             this.errorMsg = err.error.message;
          }
        } else {
             this.errorMsg = 'Registration failed. Server might be unreachable.';
        }
      }
    });
  }
}
