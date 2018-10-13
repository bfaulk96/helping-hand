import { Component, OnInit } from '@angular/core';
import {TranslateService, TranslateModule} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.page.html',
  styleUrls: ['./setup.page.scss'],
})
export class SetupPage implements OnInit{
    public pageTitle: string;
    public appTitle: string;
    public language: string;

    public languages: string[] = ['en', 'es', 'ar'];

    constructor(private platform: Platform,
                private translate: TranslateService,
                private router: Router) {
    }

    ngOnInit() {
        // let i = 0;
        // setInterval(() => {
        //     if (i === this.languages.length) {
        //         i = 0;
        //     }
        //     this.languageSwitcher(i);
        //     i++;
        //
        // }, 2000);
    }

    public ionViewDidLoad(): void {
        this.initialiseTranslation();
    }

    public changeLanguage(): void {
        this.translateLanguage();
    }

    private translateLanguage(): void {
        this.translate.use(this.language);
        this.initialiseTranslation();
    }

    private initialiseTranslation(): void {
        setTimeout(() => {
            this.appTitle = this.translate.instant('app.title');
            this.pageTitle = this.translate.instant('home.title');
        }, 250);
    }

    private submit(): void {
        localStorage.setItem('language', this.language);
        this.router.navigate(['home']);
    }

    checkCurrentLang(language: string) {
        return language === this.translate.currentLang;
    }
}
