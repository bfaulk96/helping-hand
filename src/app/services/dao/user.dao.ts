import { ApiHelper } from '../api-helper';
import { Constants } from '../constants';
import { ApiCallFactory } from '../api-call-factory';
import { Injectable } from '@angular/core';
import { BaseDAO } from './base.dao';
import { User } from '../../models/user';

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
    }

    public getCurrentUser(): User {
        return this.currentUser;
    }

    public getUserId(): number {
        const token = window.localStorage.getItem(this.USER_ID);
        if (token) {
            return Number(token);
        } else {
            return null;
        }
    }
}
