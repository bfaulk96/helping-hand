import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouteReuseStrategy} from "@angular/router";

import {IonicModule, IonicRouteStrategy} from "@ionic/angular";
import {SplashScreen} from "@ionic-native/splash-screen/ngx";
import {StatusBar} from "@ionic-native/status-bar/ngx";

import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {AuthService} from "./services/auth-service";
import {ApiHelper} from "./services/api-helper";
import {ApiCallFactory} from "./services/api-call-factory";
import {UserDAO} from "./services/dao/user.dao";
import {Camera} from "@ionic-native/camera/ngx";
import {IonicStorageModule} from "@ionic/storage";
import {SocketService} from "./services/socket.service";
import {LogoutGuard} from "./services/route-guards/logout.guard";
import {Geolocation} from "@ionic-native/geolocation/ngx";
import {GeoLocationService} from "./services/geo-location.service";
import {AuthGuard} from "./services/route-guards/auth-guard";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        AppRoutingModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        Camera,
        AuthService,
        ApiHelper,
        ApiCallFactory,
        UserDAO,
        SocketService,
        LogoutGuard,
        AuthGuard,
        Geolocation,
        GeoLocationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
