import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LogoutGuard} from "./services/route-guards/logout.guard";
import {AuthGuard} from "./services/route-guards/auth-guard";

const routes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    }, {
        path: "home",
        loadChildren: "./home/home.module#HomePageModule"
    }, {
        path: "about",
        loadChildren: "./about/about.module#AboutPageModule"
    }, {
        path: "resources",
        loadChildren: "./resources/resources.module#ResourcesPageModule"
    }, {
        path: "register",
        loadChildren: "./register/register.module#RegisterPageModule"
    }, {
        path: "login",
        loadChildren: "./login/login.module#LoginPageModule"
    }, {
        path: "logout",
        canActivate: [LogoutGuard],
        loadChildren: "./login/login.module#LoginPageModule",
        data: {logout: true}
    }, {
        path: "vision",
        loadChildren: "./vision/vision.module#VisionPageModule"
    }, {
        path: "settings",
        loadChildren: "./settings/settings.module#SettingsPageModule"
    }, {
        path: "setup",
        loadChildren: "./setup/setup.module#SetupPageModule"
    }, {
        path: "verify",
        loadChildren: "./verify/verify.module#VerifyPageModule"
    }, {
        path: "connect",
        canActivate: [AuthGuard],
        loadChildren: "./connect/connect.module#ConnectPageModule"
    }, {
        path: "requests",
        loadChildren: "./requests/requests.module#RequestsPageModule"
    }, {
        path: "requests",
        canActivate: [AuthGuard],
        loadChildren: "./requests/requests.module#RequestsPageModule"
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
