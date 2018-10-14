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
  public language: string;

  constructor(private platform: Platform,
              private translate: TranslateService,
              private appComp: AppComponent) {

  }

  get isLoggedIn() {
    return this.appComp.isLoggedIn;
  }

}
