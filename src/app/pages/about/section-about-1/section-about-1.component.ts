import { AfterViewChecked, Component, OnInit } from '@angular/core';
import Aos from 'aos';

@Component({
  selector: 'app-section-about-1',
  imports: [],
  templateUrl: './section-about-1.component.html',
  styleUrl: './section-about-1.component.css',
})
export class SectionAbout1Component implements OnInit , AfterViewChecked {
  ngOnInit(): void {
    Aos.init();
  }
  ngAfterViewChecked(): void {
    Aos.refresh();
  }
}
