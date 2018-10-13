import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    public appPages = [
        {
            title: 'home.title',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'about.title',
            url: '/about',
            icon: 'information-circle-outline'
        },
        {
            title: 'resources.title',
            url: '/resources',
            icon: 'link'
        },
        {
            title: 'contact.title',
            url: '/contact',
            icon: 'phone-portrait'
        },
        {
            title: 'register.title',
            url: '/register',
            icon: 'create'
        }
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private translate: TranslateService) {
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
        this.translate.setDefaultLang('en');

        if (this.translate.getBrowserLang() !== undefined) {
            this.translate.use(this.translate.getBrowserLang());
        } else {
            this.translate.use('en');
        }
    }
}
