import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    public isLoggedIn: boolean = false;
    public appPages = [
        {
            title: 'home.title',
            viewType: 'both',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'about.title',
            viewType: 'both',
            url: '/about',
            icon: 'information-circle-outline'
        },
        {
            title: 'resources.title',
            viewType: 'both',
            url: '/resources',
            icon: 'link'
        },
        {
            title: 'contact.title',
            viewType: 'both',
            url: '/contact',
            icon: 'phone-portrait'
        },
        {
            title: 'register.title',
            viewType: 'loggedOut',
            url: '/register',
            icon: 'create'
        },
        {
            title: 'settings.title',
            viewType: 'both',
            url: '/settings',
            icon: 'settings'
        }
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private translate: TranslateService,
        private router: Router) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.initTranslate();
        });
    }

    private initTranslate(){

        const lang = localStorage.getItem("language");
        if (lang) {
            this.translate.setDefaultLang(lang);
        } else {
            if (this.translate.getBrowserLang() !== undefined) {
                this.translate.use(this.translate.getBrowserLang());
            } else {
                this.translate.use('en');
            }
            this.router.navigate(['setup']);
        }

    }

    shouldShowLink(appPage) {
        return appPage.viewType === 'both' || (this.isLoggedIn ? appPage.viewType === 'loggedIn' : appPage.viewType === 'loggedOut');
    }
}
