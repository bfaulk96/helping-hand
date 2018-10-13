import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth-service';
import {Router} from '@angular/router';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  currentLoginCredentials: any = {
    email: "",
    password: ""
  };
  loading: boolean = false;

  authSvc: AuthService;

  constructor(
    private appComp: AppComponent,
    private router: Router,
    authSvc: AuthService,
  ) {
    this.authSvc = authSvc;
  }

  ngOnInit() {
  }

  login() {
    console.log(this.currentLoginCredentials);
    this.loading = true;
    this.authSvc.login(this.currentLoginCredentials.email, this.currentLoginCredentials.password).subscribe(
      data => {
        this.router.navigate(['/home']);
        this.appComp.isLoggedIn = true;
        this.loading = false;
      },
      error => {
        console.log('stuff happens');
        this.loading = false;
      }, () => {
        this.loading = false;
      }
    );

  }
}
