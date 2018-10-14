import {Component, OnInit, ViewChild} from "@angular/core";
import {AuthService} from "../services/auth-service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    public static readonly EMAIL_REGEXP: RegExp = /[^@\n]+@[^.\n]+\.[^\n]+/;

    @ViewChild('seekerRadio') seekerRadio: any;
    @ViewChild('helperRadio') helperRadio: any;

    public email: string = '';
    public password: string = '';
    public confirmPassword: string = '';
    public isHelper: boolean = false;
    loading: boolean = false;

    constructor(private authService: AuthService,
                private router: Router) {
    }

    public ngOnInit(): void {
    }

    public register(): void {
        this.isHelper = !this.seekerRadio.checked;
        this.loading = true;
        this.authService.register(this.email, this.password, this.isHelper).subscribe(
            (registerResponse: boolean): void => {
                console.log(registerResponse);
                this.loading = false;

                if (registerResponse === true) {
                    this.router.navigate(["home"]);
                } else {
                    // TODO: Don't alert.
                    alert("Failed to register!");
                }
            },
            (error: Error): void => {
                console.error(error);

                // TODO: Don't alert.
                alert("Failed to register!");
                this.loading = false;
            },
            () => {
                this.loading = false;
            }
        );
    }

    get validRegistration(): boolean {
        return this.validEmail() && this.validPassword() && this.password === this.confirmPassword;
    }

    public validEmail(): boolean {
        return this.email.match(RegisterPage.EMAIL_REGEXP) !== null;
    }

    public validPassword(): boolean {
        return this.password.length > 5 && // Passwords must be 6 or more characters.
            // this.password.match(/.*[0-9].*/) !== null && // Passwords must contain a number.
            // this.password.match(/.*[!@#$%^&*()_+-=~`{}|\\:"<>?;',/.[\] ].*/) !== null && // Passwords must contain a special character.
            // this.password.match(/.*[A-Z].*/) !== null && // Passwords must contain an uppercase letter.
            this.password.match(/.*[a-z].*/) !== null; // Passwords must contain an lowercase letter.
    }
}
