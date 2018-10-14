import { Component } from '@angular/core';
import {TranslateService, TranslateModule} from "@ngx-translate/core";
import {Platform} from "@ionic/angular";
import {AppComponent} from "../app.component";
import {FcmService} from "../services/fcm-service";
import {FCM} from "@ionic-native/fcm/ngx";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ApiHelper} from "../services/api-helper";

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
              private apiHelper: ApiHelper,
              private httpClient: HttpClient,
              private fcm: FCM,
  ) {
    this.fcmHandler();
  }

  get isLoggedIn() {
    return AppComponent.staticIsLoggedIn;
  }

  private makeCall(token: string): void {
    console.log("in new makeCall method");

    this.httpClient.put(this.apiHelper.getServiceEndPoint() + "/users/update-fcm", {
      "token": token
    }, {
      headers: {
        "Authorization": "Bearer " + this.apiHelper.getAccessTokenFromMem()
      }
    }).subscribe(
      (res: any): void => {
        console.log(res);

      },
      (error: HttpErrorResponse): void => {
        console.error(error);
      }
    );
  }

  fcmHandler(): void {
    this.fcm.getToken().then(token => {
      console.log("getToken()");
      this.makeCall(token);
    });
    this.fcm.onTokenRefresh().subscribe(tokenFromRefresh => {
      console.log("onTokenRefresh()");
      this.makeCall(tokenFromRefresh);
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
