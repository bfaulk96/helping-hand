import { Component } from '@angular/core';
import {TranslateService, TranslateModule} from "@ngx-translate/core";
import {Platform} from "@ionic/angular";
import {AppComponent} from "../app.component";
import {FcmService} from "../services/fcm-service";
import {FCM} from "@ionic-native/fcm/ngx";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  public language: string;

  constructor(private platform: Platform,
              private translate: TranslateService,
              private appComp: AppComponent,
              private fcmService: FcmService,
              private fcm: FCM,
  ) {
    this.fcmHandler();
  }

  get isLoggedIn() {
    return this.appComp.isLoggedIn;
  }

  fcmHandler(): void {
    this.fcm.getToken().then(token => {
      this.fcmService.onTokenReceived(token);
    });
    this.fcm.onTokenRefresh().subscribe(tokenFromRefresh => {
      this.fcmService.onTokenReceived(tokenFromRefresh);
    });
    this.fcm.onNotification().subscribe((data) => {

      // handle notification receive when in foreground
      // if (!data.wasTapped) {
      //   if (this.platformHelper.isIOS()) {
      //     let alert = this.alertCtrl.create({
      //       title: data.aps.alert.title,
      //       subTitle: data.aps.alert.body,
      //       buttons: ['Dismiss']
      //     });
      //     alert.present();
      //   } else if (this.platformHelper.isAndroid()) {
      //     let alert = this.alertCtrl.create({
      //       title: data.title,
      //       subTitle: data.body,
      //       buttons: ['Dismiss']
      //     });
      //     alert.present();
      //   }
      // }
    });
  }

}
