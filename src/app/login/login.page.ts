import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth-service';
import {ActivatedRoute, Router} from '@angular/router';
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

  constructor(private appComp: AppComponent,
              private router: Router,
              private authSvc: AuthService,
              private route: ActivatedRoute) {
    console.log(this.route.snapshot.data);
    if (this.route.snapshot.data && this.route.snapshot.data.logout) {
      this.appComp.isLoggedIn = false;
      localStorage.removeItem("token");
    }
  }

  ngOnInit() {
  }

  login() {
    console.log(this.currentLoginCredentials);
    this.loading = true;
    this.authSvc.login(this.currentLoginCredentials.email, this.currentLoginCredentials.password).subscribe(
        (data: any) => {
        console.log(data);
        this.router.navigate(['/home']);
        this.appComp.isLoggedIn = true;
        this.loading = false;
      },
      error => {
        console.log('stuff happens');
        this.loading = false;
        localStorage.removeItem("token");
      }, () => {
        this.loading = false;
      }
    );

  }
}
