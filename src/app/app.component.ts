import {Component, OnDestroy, OnInit} from "@angular/core";

import {Platform} from "@ionic/angular";
import {SplashScreen} from "@ionic-native/splash-screen/ngx";
import {StatusBar} from "@ionic-native/status-bar/ngx";
import {TranslateService} from "@ngx-translate/core";
import {ApiHelper} from "./services/api-helper";
import {UserDAO} from "./services/dao/user.dao";
import {Router} from "@angular/router";
import {SocketService} from "./services/socket.service";
import {Storage} from "@ionic/storage";
import {fromPromise} from "rxjs/internal/observable/fromPromise";
import {Geoposition} from "@ionic-native/geolocation/ngx";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {GeoLocationService} from "./services/geo-location.service";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"]
})
export class AppComponent {
    public static staticIsLoggedIn: boolean = false;
    private destroy$: Subject<null> = new Subject<null>();

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
            title: "register.title",
            viewType: "loggedOut",
            url: "/register",
            icon: "create"
        },
        {
            title: "vision.title",
            viewType: "both",
            url: "/vision",
            icon: "camera"
        },
        {
            title: "settings.title",
            viewType: "both",
            url: "/settings",
            icon: "settings",
        },
        {
            title: "connect.title",
            viewType: "loggedIn",
            url: "/connect",
            icon: "connect",
        }
    ];

    constructor(private platform: Platform,
                private splashScreen: SplashScreen,
                private statusBar: StatusBar,
                private translate: TranslateService,
                private userDao: UserDAO,
                private apiHelper: ApiHelper,
                private router: Router,
                private socketService: SocketService,
                private storage: Storage,
                private geolocationService: GeoLocationService) {
        this.initializeApp();
    }

    initializeApp() {
        this.apiHelper.setEnv("local");
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.initTranslate();
            this.apiHelper.getAccessToken().subscribe(token => {
                AppComponent.staticIsLoggedIn = this.isLoggedIn = !!token;
            }, () => {
                AppComponent.staticIsLoggedIn = this.isLoggedIn = false;
            });
            this.socketService.initSocket();
            this.socketService.onException().subscribe(message => console.log({message}));
        });
    }

    ngOnInit() {
        this.geolocationService.watchCurrentLocation()
            .pipe(takeUntil(this.destroy$))
            .subscribe((location: Geoposition) => {
                this.socketService.emit("send-location", {
                    lat: location.coords.latitude,
                    lng: location.coords.longitude
                });
            });
    }

    private initTranslate() {
        fromPromise(this.storage.get("language")).subscribe(lang => {
            if (lang) {
                this.translate.setDefaultLang(lang);
            } else {
                if (this.translate.getBrowserLang() !== undefined) {
                    this.translate.use(this.translate.getBrowserLang());
                } else {
                    this.translate.use("en");
                }
                this.router.navigate(["setup"]);
            }
        });
    }

    shouldShowLink(appPage) {
        return appPage.viewType === "both" || (this.isLoggedIn ? appPage.viewType === "loggedIn" : appPage.viewType === "loggedOut");
    }

    ngOnDestroy() {
        this.destroy$.next(null);
    }
}
