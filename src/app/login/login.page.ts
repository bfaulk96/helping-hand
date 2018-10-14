import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth-service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppComponent} from '../app.component';
import {ToastController} from "@ionic/angular";
import {TranslateService} from "@ngx-translate/core";
import { Storage } from '@ionic/storage';

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
              private route: ActivatedRoute,
              private translate: TranslateService,
              private toastController: ToastController,
              private storage: Storage) {
    if (this.route.snapshot.data && this.route.snapshot.data.logout) {
      this.appComp.isLoggedIn = false;
      this.storage.remove("token");
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
  }

  login() {
    console.log(this.currentLoginCredentials);
    this.loading = true;
    this.authSvc.login(this.currentLoginCredentials.email, this.currentLoginCredentials.password).subscribe(
        (data: any) => {
        this.router.navigate(['/home']);
        this.appComp.isLoggedIn = true;
        this.loading = false;
        this.toastController.create({
            message: 'Login succeeded.',
            duration: 4000,
            showCloseButton: true,
            cssClass: 'toast-success',
            closeButtonText: this.translate.instant('login.okay')
        }).then(toast => {
            toast.present();
        });
      },
      error => {
        this.loading = false;
        this.storage.remove("token");
        this.toastController.create({
            message: 'Login failed.',
            duration: 4000,
            showCloseButton: true,
            cssClass: 'toast-failure',
            closeButtonText: this.translate.instant('login.okay')
        }).then(toast => {
          toast.present();
        });
      }, () => {
        this.loading = false;
      }
    );

  }
}
