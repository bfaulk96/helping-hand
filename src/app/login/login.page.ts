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
    this.authSvc.login(this.currentLoginCredentials.email, this.currentLoginCredentials.password).subscribe(
      data => {
        this.router.navigate(['/home']);
        this.appComp.isLoggedIn = true;
      },
      error2 => {
        console.log('stuff happens');
      }
    );

  }
}
