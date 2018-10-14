import {Component, OnInit, ViewChild} from "@angular/core";
import {AuthService} from "../services/auth-service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {UserDAO} from "../services/dao/user.dao";
import {User} from "../models/user";
import {ApiHelper} from "../services/api-helper";
import {Router} from "@angular/router";

@Component({
    selector: "app-connect",
    templateUrl: "./connect.page.html",
    styleUrls: ["./connect.page.scss"],
})
export class ConnectPage implements OnInit {
    @ViewChild("language")
    language: any;

    @ViewChild("culture")
    culture: any;

    @ViewChild("employment")
    employment: any;

    public isHelper: boolean = false;
    public skill: string = "";

    constructor(private authService: AuthService,
                private httpClient: HttpClient,
                private userDAO: UserDAO,
                private apiHelper: ApiHelper,
                private router: Router) {
    }

    public ngOnInit(): void {
        if (this.authService.userDao.currentUser) {
            this.isHelper = this.authService.userDao.currentUser.isHelper;
        } else {
            this.router.navigate(['/home']);
        }
    }

    public seekHelp(): void {
        this.apiHelper.getAccessToken().subscribe(
            (token: string): void => {
                this.httpClient.put(this.apiHelper.getServiceEndPoint() + "/users/update-profile", {
                    "helpCategories": [this.skill]
                }, {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }).subscribe(
                    (res: any): void => {
                        console.log(res);
                        this.userDAO.setCurrentUser(res);
                        this.router.navigate(["requests"]);
                    },
                    (error: HttpErrorResponse): void => {
                        console.error(error);
                    }
                );
            }
        );
    }

    public offerHelp(): void {
        const helpCategories: Array<string> = [];

        if (this.language.checked) {
            helpCategories.push("language");
        }
        if (this.culture.checked) {
            helpCategories.push("culture");
        }
        if (this.employment.checked) {
            helpCategories.push("employment");
        }

        this.apiHelper.getAccessToken().subscribe(
            (token: string): void => {
                this.httpClient.put(this.authService.apiHelper.getServiceEndPoint() + "/users/update-profile", {
                    "helpCategories": helpCategories
                }, {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }).subscribe(
                    (res: User) => {
                        console.log(res);
                        this.userDAO.setCurrentUser(res);
                        this.router.navigate(["requests"]);
                    },
                    (error: HttpErrorResponse): void => {
                        console.error(error);
                    }
                );
            }
        );
    }
}
