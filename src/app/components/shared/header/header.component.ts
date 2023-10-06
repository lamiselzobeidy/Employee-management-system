import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  languages = [
    {
      code: "en",
      name: "english",
      countryCode: "gb"
    },
    {
      code: "ar",
      name: "العربية",
      countryCode: "sa"
    }
  ];
  constructor(
    private router: Router,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
  }

  onChange(lang) {
    this.translate.use(lang);
  }
}
