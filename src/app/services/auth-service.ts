import {Injectable} from "@angular/core";
import {ApiHelper} from "./api-helper";
import {ApiCallFactory} from "./api-call-factory";
import {UserDAO} from "./dao/user.dao";
import {Observable, Observer} from "rxjs/index";
import {User} from "../models/user";

@Injectable()
export class AuthService {
    public apiHelper: ApiHelper = null;
    public apiCallFactory: ApiCallFactory = null;
    public userDao: UserDAO = null;

    constructor(apiHelper: ApiHelper,
                apiCallFactory: ApiCallFactory,
                userDao: UserDAO) {
        this.apiHelper = apiHelper;
        this.apiCallFactory = apiCallFactory;
        this.userDao = userDao;
    }

    public register(email: string, password: string, isHelper: boolean): Observable<void> {
        const data: any = {
            email: email,
            password: password,
            isHelper: isHelper
        };

        return Observable.create(
            (observer: Observer<any>): void => {
                this.apiHelper.makeApiCall(
                    this.apiCallFactory.getDefaultForRegister(data)
                ).subscribe(
                    (registerResponse: any): void => {
                        observer.next(registerResponse);
                        observer.complete();
                    },
                    (error: Error): void => {
                        observer.error(error);
                    }
                );
            }
        );
    }

    public verify(token: string): Observable<boolean> {
        const params: any = {
            token: token
        };

        return Observable.create(
            (observer: Observer<boolean>): void => {
                this.apiHelper.makeApiCall(
                    this.apiCallFactory.getDefaultForVerify(params)
                ).subscribe(
                    (verifyResponse: boolean): void => {
                        observer.next(verifyResponse);
                        observer.complete();
                    },
                    (error: Error): void => {
                        observer.error(error);
                    }
                );
            }
        );
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
                    observer.error(error);
                    observer.complete();
                }
            );
        });

        return observable;

    }
}
