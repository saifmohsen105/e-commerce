import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  isLoading: boolean = false;
  messageError: string = '';
  messageSuccess: string = '';
  signInForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z]\w{7,}$/),
    ]),
  });
  submitLogin() {
    if (this.signInForm.valid) {
      this.isLoading = true;
      this.authService.sentLogin(this.signInForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          switch (res.message) {
            case 'success': // go to a home page
              this.messageSuccess = res.message;
              localStorage.setItem('userToken', res.token);
              setTimeout(() => {
                this.router.navigate(['/home']); // write in url word home and go to a home page
              }, 1000);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          this.messageError = err.error.message;
        },
      });
    } else {
      this.signInForm.markAllAsTouched();
    }
  }
}
