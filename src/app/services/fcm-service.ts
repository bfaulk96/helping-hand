import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {UserDAO} from './dao/user.dao';

@Injectable()
export class FcmService {

  private currentUser: User;

  constructor(private userDAO: UserDAO) {

  }


  tokenReceived(tokenReceived): void {

    this.userDAO.updateFcmToken(tokenReceived).subscribe(
      data => {
        console.log(data);
      },
      error1 => {
        console.log(error1);
      }
    );


  }
}
