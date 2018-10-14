import {Injectable} from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    CanActivateChild,
    CanLoad,
    RouterStateSnapshot, Route
} from '@angular/router';
import {AppComponent} from "../../app.component";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean {
        const url = `/${route.path}`;

        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if (AppComponent.staticIsLoggedIn) { return true; }
        // Navigate to the login page with extras
        this.router.navigate(['/login'], {queryParams: {'redirect' : url}});
        return false;
    }
}