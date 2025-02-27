import { Component } from '@angular/core';
import { TitleSectionComponent } from '../../../shared/components/ui/title-section/title-section/title-section.component';
import Aos from 'aos';

@Component({
  selector: 'app-section-home-2',
  imports: [TitleSectionComponent],
  templateUrl: './section-2.component.html',
  styleUrl: './section-2.component.css',
})
export class Section2Component {
  ngOnInit(): void {
    Aos.init();
  }
  ngAfterViewChecked(): void {
    Aos.refresh();
  }
}
