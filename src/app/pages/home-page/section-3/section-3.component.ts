import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { TitleSectionComponent } from '../../../shared/components/ui/title-section/title-section/title-section.component';
import { ICategories } from '../../../shared/interfaces/ICategories';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import Aos from 'aos';

@Component({
  selector: 'app-section-home-3',
  imports: [TitleSectionComponent , CommonModule, CarouselModule],
  templateUrl: './section-3.component.html',
  styleUrl: './section-3.component.css',
})
export class Section3Component implements OnInit , AfterViewChecked {
  @Input({ required: true }) getCategories: ICategories = {} as ICategories;
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
  ngOnInit(): void {
    Aos.init();
  }
  ngAfterViewChecked(): void {
    Aos.refresh();
  }
}
