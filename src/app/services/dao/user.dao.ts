import { ApiHelper } from '../api-helper';
import { Constants } from '../constants';
import { ApiCallFactory } from '../api-call-factory';
import { Injectable } from '@angular/core';
import { BaseDAO } from './base.dao';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import {tokenName} from '@angular/compiler';
import {ApiCall} from '../../models/apiCall';

@Injectable()
export class UserDAO extends BaseDAO {
    resource: string = Constants.API.RESOURCES.USER;
    apiHelper: ApiHelper;
    apiCallFactory: ApiCallFactory;

    currentUser: User;
    USER_ID = 'userId';

    constructor(apiHelper: ApiHelper, apiCallFactory: ApiCallFactory) {
        super(apiHelper, apiCallFactory, Constants.API.RESOURCES.USER);
        this.apiHelper = apiHelper;
        this.apiCallFactory = apiCallFactory;
    }

    public setCurrentUser(user: User): void {
        this.currentUser = user;
        this.setUserId(user.id);
    }

    public getCurrentUser(): User {
        return this.currentUser;
    }

    public getUserId(): number {
      return 99999;
        // const token = sessionStorage.getItem(this.USER_ID);
        // if (token) {
        //     return Number(token);
        // } else {
        //     return null;
        // }
    }

    public setUserId(value: number): void {
        // sessionStorage.setItem(this.USER_ID, value.toString());
    }

    public updateFcmToken(fcmToken: string): Observable<any> {
      const apiCall = this.apiCallFactory.getDefaultApiCallForGet();
      const url = this.apiHelper.getServiceEndPoint() + Constants.API.RESOURCES.USER + '/update-fcm';
      const method = 'PUT';
      const header: Headers = this.apiHelper.getDefaultHeader();
      const data: Object = {
        token: fcmToken
      };

      const httpRequest = this.apiHelper.makeApiCall(apiCall);
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
