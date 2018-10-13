import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';

@Injectable()
export class PlatformHelper {

    constructor(
        public platform: Platform
    ) {

    }
}
