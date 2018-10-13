import {Injectable} from "@angular/core";
import {ApiHelper} from "./api-helper";
import {ApiCallFactory} from "./api-call-factory";
import {UserDAO} from "./dao/user.dao";
import {Observable} from "rxjs";
import {User} from "../models/user";

@Injectable()
export class AuthService {

    apiHelper: ApiHelper;
    apiCallFactory: ApiCallFactory;
    userDao: UserDAO;

    constructor(
        apiHelper: ApiHelper,
        apiCallFactory: ApiCallFactory,
        userDao: UserDAO,
    ) {
        this.apiHelper = apiHelper;
        this.apiCallFactory = apiCallFactory;
        this.userDao = userDao;
    }


    public login(email: string, password: string): Observable<User> {

        const data = {
            grant_type: "password",
            email: email,
            password: password
        };

        const authSvc = this;

        const apiCall = this.apiCallFactory.getDefaultForLogin(data);

        const httpRequest = this.apiHelper.makeApiCall(apiCall);

        const observable = Observable.create(function subscribe(observer) {
            httpRequest.subscribe(
                loginObj => {
                    const loginResponse: any = loginObj;
                    const token = loginResponse.token;
                    authSvc.userDao.setCurrentUser(loginResponse.user);
                    authSvc.apiHelper.setAccessToken(token);
                    observer.next(data);
                    observer.complete();
                },
                error => {

                }
            );
        });

        return observable;

    }


}
