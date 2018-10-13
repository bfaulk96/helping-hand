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
            title: 'Home',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'About',
            url: '/about',
            icon: 'information-circle-outline'
        },
        {
            title: 'Resources',
            url: '/resources',
            icon: 'link'
        },
        {
            title: 'Contact',
            url: '/contact',
            icon: 'phone-portrait'
        },
        {
            title: 'Register',
            url: '/register',
            icon: 'create'
        }
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private translate: TranslateService
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this._initTranslate();
        });
    }

    private _initTranslate(){
        // Set the default language for translation strings, and the current language.
        this.translate.setDefaultLang('en');


        if (this.translate.getBrowserLang() !== undefined)
        {
            this.translate.use(this.translate.getBrowserLang());
        }
        else
        {
            this.translate.use('en'); // Set your language here
        }
    }
}
