import {Component} from "@angular/core";

import {Platform} from "@ionic/angular";
import {SplashScreen} from "@ionic-native/splash-screen/ngx";
import {StatusBar} from "@ionic-native/status-bar/ngx";
import {TranslateService} from "@ngx-translate/core";
import {SocketService} from "./services/socket.service";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html"
})
export class AppComponent {
    public isLoggedIn: boolean = false;
    public appPages = [
        {
            title: "home.title",
            viewType: "both",
            url: "/home",
            icon: "home"
        },
        {
            title: "about.title",
            viewType: "both",
            url: "/about",
            icon: "information-circle-outline"
        },
        {
            title: "resources.title",
            viewType: "both",
            url: "/resources",
            icon: "link"
        },
        {
            title: "contact.title",
            viewType: "both",
            url: "/contact",
            icon: "phone-portrait"
        },
        {
            title: "register.title",
            viewType: "loggedOut",
            url: "/register",
            icon: "create"
        },
        {
            title: "login.title",
            viewType: "loggedOut",
            url: "/login",
            icon: "log-in"
        },
        {
            title: "logout.title",
            viewType: "loggedIn",
            url: "/logout",
            icon: "log-out"
        },
        {
            title: "vision.title",
            viewType: "both",
            url: "/vision",
            icon: "camera"
        }
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private translate: TranslateService,
        private sockerService: SocketService) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.initTranslate();
            this.sockerService.initSocket();

            this.sockerService.onConnectedCount().subscribe(number => {
                console.log({number});
            });
        });
    }

    private initTranslate() {
        this.translate.setDefaultLang("en");

        if (this.translate.getBrowserLang() !== undefined) {
            this.translate.use(this.translate.getBrowserLang());
        } else {
            this.translate.use("en");
        }
    }

    shouldShowLink(appPage) {
        return appPage.viewType === "both" || (this.isLoggedIn ? appPage.viewType === "loggedIn" : appPage.viewType === "loggedOut");
    }
}
