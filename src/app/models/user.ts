import {Injectable} from "@angular/core";

@Injectable()
export class User {
    createdAt: string;
    email: string;
    isHelper: boolean;
    isVerified: boolean;
    rating: number;
    ratingCount: number;
    updatedAt: string;
    helpCategories: string[];
    firstName: string;
    lastName: string;
    phone: string;
    nickname: string;
}
