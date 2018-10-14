import { ApiHelper } from '../api-helper';
import { Constants } from '../constants';
import { ApiCallFactory } from '../api-call-factory';
import { Injectable } from '@angular/core';
import { BaseDAO } from './base.dao';
import { User } from '../../models/user';
import {Observable} from "rxjs/index";
import { Storage } from '@ionic/storage';
import {fromPromise} from "rxjs/internal/observable/fromPromise";

@Injectable()
export class UserDAO extends BaseDAO {
    resource: string = Constants.API.RESOURCES.USER;
    apiHelper: ApiHelper;
    apiCallFactory: ApiCallFactory;

    currentUser: User;
    USER_ID = 'userId';

    constructor(apiHelper: ApiHelper, apiCallFactory: ApiCallFactory, private storage: Storage) {
        super(apiHelper, apiCallFactory, Constants.API.RESOURCES.USER);
        this.apiHelper = apiHelper;
        this.apiCallFactory = apiCallFactory;
    }

    public setCurrentUser(user: User): void {
        this.currentUser = user;
    }

    public getCurrentUser(): User {
        return this.currentUser;
    }

    public getUserId(): Observable<number> {
        return new Observable<number>(observer => {
            fromPromise(this.storage.get(this.USER_ID)).subscribe(token => {
                if (token) {
                    observer.next(Number(token));
                } else {
                    observer.next(null);
                }
            }, (err) => {
                observer.error(err);
            });
        });
    }
}
