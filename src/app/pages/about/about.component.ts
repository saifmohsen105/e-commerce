import { Component } from '@angular/core';
import { SectionAbout1Component } from "./section-about-1/section-about-1.component";
import { SectionAbout2Component } from "./section-about-2/section-about-2.component";
import { SectionAbout3Component } from "./section-about-3/section-about-3.component";

@Component({
  selector: 'app-about',
  imports: [SectionAbout1Component, SectionAbout2Component, SectionAbout3Component],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
