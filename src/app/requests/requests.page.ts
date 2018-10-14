import {Component, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ApiHelper} from "../services/api-helper";
import {Request} from "../models/request";

@Component({
    selector: "app-requests",
    templateUrl: "./requests.page.html",
    styleUrls: ["./requests.page.scss"],
})
export class RequestsPage implements OnInit {
    public requests: Array<Request> = [];

    constructor(private httpClient: HttpClient,
                private apiHelper: ApiHelper) {
    }

    ngOnInit() {
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
