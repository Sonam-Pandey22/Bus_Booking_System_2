import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth'; // Check path is correct
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
selector: 'app-login',
standalone: true,
imports: [CommonModule, ReactiveFormsModule, RouterLink],
templateUrl: './login.html', // Corrected name
styleUrl: './login.css'       // Corrected name
})
export class LoginComponent {
loginForm: FormGroup;

constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          console.log('Login Success!', response);
          this.authService.saveToken(response.token || '');

          if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('userDetails', JSON.stringify(response));

          // Navbar ya UI ke liye agar sirf naam chahiye:
          const nameToDisplay = response.name || response.userName || 'User';
          localStorage.setItem('userName', nameToDisplay);
        }
          this.router.navigate(['/home']);
        },
        error: (err: any) => {
          console.error('Login Failed', err);
          alert('Invalid Email or Password!');
        }
      });
} else {
      alert('Please fill the form correctly.');
    }
  }
}
