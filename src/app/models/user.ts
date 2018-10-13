import {Injectable} from '@angular/core';

@Injectable()
export class User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    fcmToken: string;
    phoneNumber: string;
}
