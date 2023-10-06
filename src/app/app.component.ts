import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employee-management-system';
  constructor(private translateService: TranslateService) {
      this.translateService.addLangs(['en', 'ar']); // array of available langs
      this.translateService.setDefaultLang('en');
  }
}
