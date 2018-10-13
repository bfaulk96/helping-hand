import { Component } from '@angular/core';
import {TranslateService, TranslateModule} from "@ngx-translate/core";
import {Platform} from "@ionic/angular";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  public pageTitle: string;
  public appTitle: string;
  public language: string;

  constructor(private platform: Platform,
              private translate: TranslateService,
              private appComp: AppComponent) {

  }

  get isLoggedIn() {
    return this.appComp.isLoggedIn;
  }

  public ionViewDidLoad() : void {
    this.initialiseTranslation();
  }

  public changeLanguage() : void {
    this.translateLanguage();
  }

  private translateLanguage() : void {
    this.translate.use(this.language);
    this.initialiseTranslation();
  }

  private initialiseTranslation() : void {
    setTimeout(() => {
      this.appTitle = this.translate.instant("app.title");
      this.pageTitle = this.translate.instant("home.title");
    }, 250);
  }

  checkCurrentLang(language: string) {
    return language === this.translate.currentLang;
  }
}
