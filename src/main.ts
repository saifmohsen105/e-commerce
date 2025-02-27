import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import('aos').then(AOS => {
  AOS.init();
});
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
