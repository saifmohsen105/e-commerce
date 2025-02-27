import { AfterViewChecked, Component, OnInit } from '@angular/core';
import Aos from 'aos';

@Component({
  selector: 'app-section-about-3',
  imports: [],
  templateUrl: './section-about-3.component.html',
  styleUrl: './section-about-3.component.css',
})
export class SectionAbout3Component implements OnInit , AfterViewChecked{
  ngOnInit(): void {
    Aos.init();
  }
  ngAfterViewChecked(): void {
    Aos.refresh();
  }

}
