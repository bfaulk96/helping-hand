import {Component, OnInit} from "@angular/core";
import {AuthService} from "../services/auth-service";

@Component({
    selector: "app-connect",
    templateUrl: "./connect.page.html",
    styleUrls: ["./connect.page.scss"],
})
export class ConnectPage implements OnInit {
    public isHelper: boolean = false;

    constructor(private authService: AuthService) {
    }

    public ngOnInit(): void {
        this.isHelper = this.authService.userDao.currentUser.isHelper;
    }
}
