import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { catchError, forkJoin, Subject, takeUntil } from 'rxjs';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ProductsService } from '../../core/services/products/products.service';
import { ICategories } from '../../shared/interfaces/ICategories';
import { IFakeProducts } from '../../shared/interfaces/ifake-products';
import { IProducts } from '../../shared/interfaces/IProducts';
import { FakeProductsService } from './../../core/services/FakeProducts/fake-products.service';
import { Section1Component } from './section-1/section-1/section-1.component';
import { Section2Component } from './section-2/section-2.component';
import { Section3Component } from './section-3/section-3.component';

@Component({
  selector: 'app-home-page',
  imports: [
    Section1Component,
    CommonModule,
    CarouselModule,
    Section2Component,
    Section3Component,
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  words: string = '';
  dataApiFakeProduct = inject(FakeProductsService);
  dataApiProducts = inject(ProductsService);
  dataApiCategories = inject(CategoriesService);
  getFakeProducts: IFakeProducts = [];
  getProducts: IProducts = {} as IProducts;
  getCategories: ICategories = {} as ICategories;
  timeOut!:number;
  // i want clear timeOut when i leave this page
  // i want close api when i leave this page
  destroyComponents = new Subject<void>();

  ngOnInit(): void {
    // get data Fake product from api and product and dont call api two
    this.callApi();
    // run function typing words
    this.typing();
  }
  // funtion typing content header
  typing(): void {
    const words = `Discover the finest selection of exclusive products at our shop. Enjoy a premium shopping
           experience with unique, high-quality items curated just for you. Shop now and indulge in luxury.`;
    let i = 0;
    const typeChar = () => {
      if (i < words.length) {
        this.words += words.charAt(i);
        i++;
        this.timeOut = Number(setTimeout(typeChar, 50));
      }
    };
    typeChar();
  }
  // options of slider
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
  // code call all api
  callApi(): void {
    // call api mra wa7da
    forkJoin([
      this.dataApiFakeProduct.getFakeProducts().pipe(
        catchError((err) => {
          console.log('error in fake product ', err);
          return [];
        })
      ),
      this.dataApiProducts.getProduct().pipe(
        catchError((err) => {
          console.log('error in product ', err);
          return [];
        })
      ),
      this.dataApiCategories.getCategories().pipe(
        catchError((err) => {
          console.log('error in categories ', err);
          return [];
        })
      ),
    ])
      .pipe(takeUntil(this.destroyComponents))
      .subscribe({
        next: ([fakeProduct, product, categore]) => {
          this.getFakeProducts = fakeProduct;
          this.getProducts = product;
          this.getCategories = categore;
        },
        error: (err) => {
          console.log('this is error api ', err);
        },
      });
  }
  ngOnDestroy(): void {
    this.destroyComponents.next(); // sent ashara be stop all subscribes
    this.destroyComponents.complete(); // close all object
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
  }
}
