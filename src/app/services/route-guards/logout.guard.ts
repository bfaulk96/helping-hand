import {Injectable, NgZone} from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import {AlertController} from "@ionic/angular";
import {Observable} from "rxjs/index";

@Injectable()
export class LogoutGuard implements CanActivate {

    constructor(private router: Router, private alertController: AlertController, private zone: NgZone) {

    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return new Observable<boolean>(observer => {
            this.alertController.create({
                header: 'Log Out',
                message: 'Are you sure you would like to log out?',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (blah) => {
                            this.zone.run(() => {
                                observer.next(false);
                            });
                        }
                    }, {
                        text: 'Yes',
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