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



}
