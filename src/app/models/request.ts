import {Injectable} from "@angular/core";

@Injectable()
export class Request {
    createdAt: string;
    description: string;
    isApproved: boolean;
    isComplete: boolean;
    isRejected: boolean;
    receiverId: string;
    senderId: string;
    title: string;
    updatedAt: string;
    __v: number;
    _id: string;
}