import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  isLoading: boolean = false;
  messageError: string = '';
  messageSuccess: string = '';
  signUpForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required, // required
        Validators.minLength(3), // angular have many validtion using validators
        Validators.maxLength(20), // angular have many validtion using validators
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]), // angular have many validtion using validators
      password: new FormControl(null, [
        // angular have many validtion using validators
        Validators.required, // angular have many validtion using validators
        Validators.pattern(/^[A-Z]\w{7,}$/), // angular have many validtion using validators
      ]),
      rePassword: new FormControl(null, [Validators.required]), // angular have many validtion using validators
      phone: new FormControl(null, [
        // angular have many validtion using validators
        Validators.required, // angular have many validtion using validators
        Validators.pattern(/^\+201[0-9]{9}$/), // angular have many validtion using validators
      ]),
    },
    this.confirmPassword // this is custome validation
  );
  submitRegister() {
    if (this.signUpForm.valid) {
      this.isLoading = true;
      this.authService.sentRegister(this.signUpForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          switch (res.message) {
            case 'success': // go to a home page
              this.messageSuccess = res.message;
              setTimeout(() => {
                this.router.navigate(['/sign-in']); // write in url word home and go to a home page
              }, 1000);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          this.messageError = err.error.message;
        },
      });
    }else{
      this.signUpForm.markAllAsTouched();
    }
  }
  // check the password === repassword
  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    return password === rePassword ? null : { missMatch: true };
  }
}
