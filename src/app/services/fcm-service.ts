import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {UserDAO} from './dao/user.dao';

@Injectable()
export class FcmService {

    currentUser: User;

    constructor(
        private userDAO: UserDAO,
    ) {

    }

  onTokenReceived(tokenReceived): void {


      this.userDAO.updateDeviceInfo(tokenReceived).subscribe(
        data => {
          console.log(data);
        },
        error1 => {
          console.log(error1);
        }
      );
    }


}
