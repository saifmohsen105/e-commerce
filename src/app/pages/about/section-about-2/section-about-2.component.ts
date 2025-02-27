import { AfterViewChecked, Component, OnInit } from '@angular/core';
import Aos from 'aos';

@Component({
  selector: 'app-section-about-2',
  imports: [],
  templateUrl: './section-about-2.component.html',
  styleUrl: './section-about-2.component.css',
})
export class SectionAbout2Component implements OnInit , AfterViewChecked {
  ngOnInit(): void {
    Aos.init();
  }
  ngAfterViewChecked(): void {
    Aos.refresh();
  }
}
