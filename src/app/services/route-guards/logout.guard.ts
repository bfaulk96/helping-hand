import {Injectable, NgZone} from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import {AlertController} from "@ionic/angular";
import {Observable} from "rxjs/index";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class LogoutGuard implements CanActivate {

    constructor(private router: Router,
                private alertController: AlertController,
                private zone: NgZone,
                private translate: TranslateService) {

    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return new Observable<boolean>(observer => {
            this.alertController.create({
                header: this.translate.instant('logout.spaceTitle'),
                message: this.translate.instant('logout.confirm'),
                buttons: [
                    {
                        text: this.translate.instant('logout.cancel'),
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (blah) => {
                            this.zone.run(() => {
                                observer.next(false);
                            });
                        }
                    }, {
                        text: this.translate.instant('logout.yes'),
                        handler: () => {
                            this.zone.run(() => {
                                observer.next(true);
                            });
                        }
                    }
                ]
            }).then(alert => {
                alert.present();
            });
        });
    }
}