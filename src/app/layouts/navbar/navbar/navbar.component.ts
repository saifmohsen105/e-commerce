import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  idPlatForm = inject(PLATFORM_ID);
  router = inject(Router);
  checkUserIsLogin() {
    if (isPlatformBrowser(this.idPlatForm)) {
      if (!localStorage.getItem('userToken')) {
        console.log('Please login...!');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'It looks like you are not logged in. Please log in to continue and access all features.',
          footer:
            '<a href="/sign-in" class = "cursor-pointer">Do you want login ?</a>',
        });
        return;
      }
    }
    this.router.navigate(['/cart']);
  }
}
