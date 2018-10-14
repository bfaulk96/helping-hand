import {Component, OnInit} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ApiHelper} from "../services/api-helper";
import {Request} from "../models/request";
import {UserDAO} from "../services/dao/user.dao";
import {User} from "../models/user";
import {Geolocation} from "@ionic-native/geolocation/ngx";

@Component({
    selector: "app-requests",
    templateUrl: "./requests.page.html",
    styleUrls: ["./requests.page.scss"],
})
export class RequestsPage implements OnInit {
    public isHelper: boolean = false;
    public helpers: Array<User> = [];
    public requests: Array<Request> = [];

    constructor(private httpClient: HttpClient,
                private apiHelper: ApiHelper,
                private userDAO: UserDAO,
                private geoLocation: Geolocation) {
    }

    ngOnInit() {
        this.isHelper = this.userDAO.currentUser.isHelper;

        if (!this.isHelper) {
            this.apiHelper.getAccessToken().subscribe(
                (token: any): void => {
                    this.geoLocation.getCurrentPosition().then(
                        (position: any): void => {
                            console.log(position);
                            this.httpClient.get(this.apiHelper.getServiceEndPoint() + "/requests/current?lat=" + position.coords.latitude + "&long=" + position.coords.longitude, {}).subscribe(
                                (res: any) => {
                                    const helpers = [];
                                    res.users.forEach(
                                        (user: User) => {
                                            if (user.isHelper) {
                                                helpers.push(user);
                                            }
                                        }
                                    );
                                    this.helpers = helpers;
                                    console.log(helpers);
                                },
                                (error) => {
                                    console.error(error);
                                }
                            );
                        }
                    );

                },
                (error): void => {
                    console.error(error);
                }
            );
        } else {
            this.apiHelper.getAccessToken().subscribe(
                (token: any): void => {
                    this.httpClient.get(this.apiHelper.getServiceEndPoint() + "/requests/receiver", {
                        headers: {
                            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbHBlckBoZWxwZXIuY29tIiwiaWF0IjoxNTM5NDk5NTkwLCJleHAiOjE1Mzk1MDMxOTB9.k-VHx-7wWi7hawBT95WToblmAn9btd4RbcPYwn3UvIA"
                        }
                    }).subscribe(
                        (res: Array<Request>) => {
                            this.requests = res;
                            console.log(res);
                        },
                        (error) => {
                            console.error(error);
                        }
                    );
                },
                (error): void => {
                    console.error(error);
                }
            );
        }
    }

    public request(helper: User): void {
        const user: User = this.userDAO.getCurrentUser();
        this.httpClient.post(this.apiHelper.getServiceEndPoint() + "/requests/create", {
            title: "test title",
            description: "test description",
            senderId: user._id,
            // receiverId: helper._id,
            receiverId: "5bc2509502ed722737a7100c",
            helpCategory: user.helpCategories[0]
        }, {
            headers: {
                "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbHBlckBoZWxwZXIuY29tIiwiaWF0IjoxNTM5NTA1MjE1LCJleHAiOjE1Mzk1MDg4MTV9.HOgSW3D8H3noRTTq0OeYRuZLfo06bZXnWY9idGbxo6A"
            }
        }).subscribe(
            (res: any): void => {
                console.log(res);
            },
            (error: HttpErrorResponse): void => {
                console.error(error);
            }
        );
    }

    public accept(request: Request): void {
        this.httpClient.post(this.apiHelper.getServiceEndPoint() + "/requests/update-request", {
            requestId: request._id,
            isApproved: true,
            isComplete: request.isComplete,
            isRejected: false
        }, {
            headers: {
                "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbHBlckBoZWxwZXIuY29tIiwiaWF0IjoxNTM5NDk5NTkwLCJleHAiOjE1Mzk1MDMxOTB9.k-VHx-7wWi7hawBT95WToblmAn9btd4RbcPYwn3UvIA"
            }
        }).subscribe(
            (res: any): void => {
                console.log(res);
            },
            (error: HttpErrorResponse): void => {
                console.error(error);
            }
        );
    }

    public reject(request: Request): void {
        this.httpClient.post(this.apiHelper.getServiceEndPoint() + "/requests/update-request", {
            requestId: request._id,
            isApproved: false,
            isComplete: request.isComplete,
            isRejected: true
        }, {
            headers: {
                "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbHBlckBoZWxwZXIuY29tIiwiaWF0IjoxNTM5NDk5NTkwLCJleHAiOjE1Mzk1MDMxOTB9.k-VHx-7wWi7hawBT95WToblmAn9btd4RbcPYwn3UvIA"
            }
        }).subscribe(
            (res: any): void => {
                console.log(res);
            },
            (error: HttpErrorResponse): void => {
                console.error(error);
            }
        );
    }
}
