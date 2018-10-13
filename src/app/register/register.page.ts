import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    public email: string = '';
    public password: string = '';
    public confirmPassword: string = '';
    public disabled: boolean = true;

    constructor() {
    }

    public ngOnInit(): void {
    }

    public register(): void {
    }

    get validRegistration(): boolean {
        return this.email.length < 3 || this.password.length < 8 || this.password !== this.confirmPassword;
    }
}
