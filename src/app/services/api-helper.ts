import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Constants} from './constants';
import {Observable} from 'rxjs/index';
import {ApiCall} from '../models/apiCall';

@Injectable()
export class ApiHelper {

    private env: string;
    private accessToken: string;
    private serviceEndpoint: string;

    constructor(
        private httpClient: HttpClient,
        // private router: Router, //use ionic's router
        // private dialog: MatDialog, //use ionic's
    ) {

    }

    public setEnv(env: string): void {
        this.env = env;
        switch (env) {
            case 'local':
                this.serviceEndpoint = Constants.API.ENDPOINTS.LOCAL;
                break;
            case 'prod':
                this.serviceEndpoint = Constants.API.ENDPOINTS.PROD;
                break;
        }
    }

    public getAccessToken(): string {
        this.accessToken = this.accessToken || localStorage.getItem('token');
        return this.accessToken;
    }

    public setAccessToken(token: string): void {
        localStorage.setItem('token', token);
        this.accessToken = token;
    }

    public getServiceEndPoint(): string {
        return this.serviceEndpoint;
    }

    public makeApiCall<T>(apiCall: ApiCall): Observable<T> {
        const reqOptions: any = {
            headers: apiCall.headers,
            body: apiCall.data,
        };
        reqOptions.headers = new HttpHeaders({
            "Content-Type": "application/json",
            "Authorization": "Bearer" + this.getAccessToken()
        });

        let qs: string = "";
        if (apiCall.params) {
            qs = apiCall.params.length > 0 ? "?" : "";
            Object.keys(apiCall.params).forEach(
                (param: string, i: number): void => {
                    if (i === 0) {
                        qs = "?";
                    }
                    qs += param + "=" + apiCall.params[param];
                    if (i < apiCall.params.length - 1) {
                        qs += "&";
                    }
                }
            );
        }

        const that = this;
        const obs = Observable.create(function subscribe(observer) {
            const httpRequest = that.httpClient.request(apiCall.method, apiCall.url + qs, reqOptions);
            httpRequest.subscribe(
                data => {
                    observer.next(data);
                    observer.complete();
                },
                error => {
                    that.handleApiError(error);
                    observer.error(error);
                }
            );
        });
        return obs;
    }

    private handleApiError(apiError: any): void {
        console.error(apiError);
        switch (apiError) {
            case 401:
                this.displayApiError({
                    title: 'Forbidden',
                    message: 'Must be authenticated.'
                });
        }
    }

    private displayApiError(data: any): void {
        // todo dialog for errors
    }

}
