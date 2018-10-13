import {Injectable} from '@angular/core';

@Injectable()
export class ApiCall {
    public url: string;
    public method: string;
    public params: any;
    public data: any;
    public headers: Headers;
    public resource: string;
}
