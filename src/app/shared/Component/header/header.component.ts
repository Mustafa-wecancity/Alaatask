import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from '../../Layout/layout.service';

@Component({
  selector: 'app-header',
//  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private translate: TranslateService,
    public layout: LayoutService
  ) {}
  ngOnInit(): void {
    this.init();
    this.mode(true)
  }

  private init() {
    if (typeof localStorage !== 'undefined') {
      const language = localStorage.getItem('language');
      language != null
        ? this.changeLanguage(language, false)
        : this.changeLanguage('ar', false);
    }
  }

  protected changeLanguage(code: string, reload: boolean) {
    debugger
    this.translate.use(code);
    if (typeof localStorage !== 'undefined') {
      const language = localStorage.getItem('language');
      if (language != code) {
        this.translate.use(code);
        localStorage.setItem('language', code);
        this.layout.language = code;
        this.layout.config.langu = code;

        if (code == 'ar') this.customizeLayoutType('rtl', reload);
        else this.customizeLayoutType('ltr', reload);
      } else {
        console.log(code, '==', language);
      }
    }
  }

  public layoutType: string = 'rtl'; // default
  // Layout Type
  private customizeLayoutType(val: string, reload: boolean) {
    this.layout.config.settings.layout_type = val;
    if (typeof document !== 'undefined')
      if (val == 'rtl') {
        document.getElementsByTagName('html')[0].setAttribute('dir', val);
        document.getElementsByTagName('html')[0].setAttribute('lang', 'ar');
        if (typeof document.body.classList !== 'undefined') {
          // access the classList property
          document.body.classList.remove('ltr');
          document.body.classList.add('rtl');
        }
        reload == true ? this.layout.reloadPage() : null;
      } else {
        document.getElementsByTagName('html')[0].removeAttribute('dir');
        document.getElementsByTagName('html')[0].setAttribute('lang', 'en');
        if (typeof document.body.classList !== 'undefined') {
          // access the classList property
          document.body.classList.remove('rtl');
          document.body.classList.add('ltr');
        }
        reload == true ? this.layout.reloadPage() : null;
      }
  }



  protected falg:boolean=true

  mode(falg:boolean){

    this.falg=falg
    if (falg) {
      document.documentElement.classList.add('dark');
  } else {
      document.documentElement.classList.remove('dark')
  }

  }
}


