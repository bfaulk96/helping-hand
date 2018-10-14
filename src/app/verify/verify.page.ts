import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {AuthService} from "../services/auth-service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: "app-verify",
    templateUrl: "./verify.page.html",
    styleUrls: ["./verify.page.scss"]
})
export class VerifyPage implements OnInit {
    public readonly VerificationResult = VerificationResult; // For use in the template.

    public verificationResult: VerificationResult = VerificationResult.IN_PROGRESS;

    constructor(private route: ActivatedRoute,
                private authService: AuthService,
                private router: Router) {
        this.route.queryParamMap.subscribe(
            (params: ParamMap): void => {
                if (params.has("token")) {
                    const token: string = params.get("token");
                    this.authService.verify(token).subscribe(
                        (verifyResponse: boolean): void => {
                            if (verifyResponse === true) {
                                this.verificationResult = VerificationResult.VALID;
                            } else {
                                this.verificationResult = VerificationResult.INVALID;
                            }
                        },
                        (error: HttpErrorResponse): void => {
                            console.error(error);
                            if (error.status === 400) {
                                this.verificationResult = VerificationResult.INVALID;
                            } else {
                                this.verificationResult = VerificationResult.ERROR;
                            }
                        }
                    );
                } else {
                    console.error("No token provided.");
                    this.verificationResult = VerificationResult.ERROR;
                }
            },
            (error: Error): void => {
                console.error(error);
                this.verificationResult = VerificationResult.ERROR;
            }
        );
    }

    public ngOnInit(): void {
    }

    public goToHome(): void {
        this.router.navigate(["home"]);
    }
}

export enum VerificationResult {
    IN_PROGRESS = "In Progress",
    VALID = "Valid",
    INVALID = "Invalid",
    ERROR = "Error"
}
