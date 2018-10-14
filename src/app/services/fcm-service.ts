import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {UserDAO} from './dao/user.dao';
import {Observable} from "rxjs/index";

@Injectable()
export class FcmService {

    currentUser: User;

    constructor(
        private userDAO: UserDAO,
    ) {

    }

  onTokenReceived(tokenReceived): Observable<any> {

      console.log(tokenReceived);

      const httpRequest = this.userDAO.updateDeviceInfo(tokenReceived);

      return Observable.create(function subscribe(observer) {
        httpRequest.subscribe(
          userDevice => {
            observer.next(userDevice);
            observer.complete();
          },
          error => {
            console.log(error);
            observer.error(error);
          });
      });

    }


}
