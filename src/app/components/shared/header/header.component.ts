import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
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

  ngOnInit(): void {
  }

  onChange(lang) {
    console.log("el event", lang);

    this.translate.use(lang);
  }

  redirectTo(url: string) {
    console.log("link ", url);
    this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
      this.router.navigate([url]);
    });
  }
}
