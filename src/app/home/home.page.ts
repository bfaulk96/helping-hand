import { Component } from '@angular/core';
import {TranslateService, TranslateModule} from "@ngx-translate/core";
import {Platform} from "@ionic/angular";
import {FcmService} from '../services/fcm-service';
import {FCM} from '@ionic-native/fcm';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  public pageTitle: string;
  public appTitle: string;
  public language: string;
  private fcmService: FcmService;

  constructor(private platform: Platform,
              private translate: TranslateService,
              public fcm: FCM,
              fcmService: FcmService,
  ) {
    if (this.platform.is('cordova')) {
      this.fcmHandler();
    }
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

  fcmHandler(): void {
    this.fcm.getToken().then(token => {
      this.fcmService.tokenReceived(token);
    });
    this.fcm.onTokenRefresh().subscribe(tokenFromRefresh => {
      this.fcmService.tokenReceived(tokenFromRefresh);
    });
    this.fcm.onNotification().subscribe((data) => {
      // this is to handle when the notification is received while app is in foreground
      if (!data.wasTapped) {
        // if (this.platformHelper.isIOS()) {
        //   let alert = this.alertCtrl.create({
        //     title: data.aps.alert.title,
        //     subTitle: data.aps.alert.body,
        //     buttons: ['Dismiss']
        //   });
        //   alert.present();
        // } else if (this.platformHelper.isAndroid()) {
        //   let alert = this.alertCtrl.create({
        //     title: data.title,
        //     subTitle: data.body,
        //     buttons: ['Dismiss']
        //   });
        //   alert.present();
        // }
      }
    });
  }
}
