import {Injectable} from "@angular/core";
import {Geolocation, Geoposition} from "@ionic-native/geolocation/ngx";
import {interval, Observable} from "rxjs";
import {filter, startWith, switchMap, tap} from "rxjs/operators";
import {fromPromise} from "rxjs/internal-compatibility";

@Injectable()
export class GeoLocationService {

    constructor(private geolocationService: Geolocation) {
    }

    private _previousLocation: Geoposition;
    private _minute: number = 1;

    watchCurrentLocation(): Observable<Geoposition> {
        return interval(1000 * 60 * this._minute)
            .pipe(startWith(0))
            .pipe(switchMap(_ => fromPromise(this.geolocationService.getCurrentPosition())))
            .pipe(filter((location: Geoposition) => {
                const {latitude, longitude} = location.coords;
                return !this._previousLocation
                    || (latitude !== this._previousLocation.coords.latitude
                        || longitude !== this._previousLocation.coords.longitude);
            }))
            .pipe(tap((location: Geoposition) => this._previousLocation = location));
    }
}
