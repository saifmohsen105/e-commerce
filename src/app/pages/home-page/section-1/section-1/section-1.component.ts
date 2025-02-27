import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  inject,
  Input,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import Aos from 'aos';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { CartService } from '../../../../core/services/cart/cart.service';
import { TitleSectionComponent } from '../../../../shared/components/ui/title-section/title-section/title-section.component';
import { IProducts } from '../../../../shared/interfaces/IProducts';

@Component({
  selector: 'app-section-home-1',
  imports: [TitleSectionComponent, CommonModule, CarouselModule],
  templateUrl: './section-1.component.html',
  styleUrl: './section-1.component.css',
})
export class Section1Component implements OnInit, AfterViewChecked {
  @Input({ required: true }) products: IProducts = {} as IProducts;
  idPlatForm = inject(PLATFORM_ID);
  toastrService = inject(ToastrService);
  cartService = inject(CartService);
  carouselOptions = {
    loop: true,
    margin: 10,
    nav: false, // btns nex and prev
    autoplay: true, // auto play
    autoplayTimeout: 2500, // time to change slide
    autoplaySpeed: 1000, // speed to change slide
    smartSpeed: 750, // speed to change slide
    dotsSpeed: 1000, // speed to change slide
    responsive: {
      // responsive design
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 },
      1200: { items: 4 },
    },
  };
  addToCart(id: string): void {
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
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.toastrService.success(res.message, 'Exculsive');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnInit(): void {
    Aos.init();
  }
  ngAfterViewChecked(): void {
    Aos.refresh();
  }
}
