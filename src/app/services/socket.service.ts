import {Injectable} from "@angular/core";
import * as io from "socket.io-client";
import {Socket} from "socket.io";
import {Observable} from "rxjs";
import {ApiHelper} from "./api-helper";

export interface ObjectDictionary<T> {
    [key: string]: T;
}

@Injectable()
export class SocketService {

    private socketClient: SocketIOClient.Socket;

    constructor(
        private apiHelper: ApiHelper,
    ) {
    }

    initSocket(token: string): void {
        this.socketClient = io.connect(this.apiHelper.getServiceEndPoint(), {
            query: {token}
        });
    }

    emit(event: string, data: ObjectDictionary<any>) {
        if (this.socketClient) {
            this.socketClient.emit(event, data);
        }
    }

    onException(): Observable<any> {
        return new Observable<any>(observer => {
            this.socketClient.on("exception", (data) => {
                observer.next(data);
            });
        });
    }

    onConnectedCount(): Observable<number> {
        return new Observable<number>(observer => {
            this.socketClient.on("connected-count", (data) => {
                observer.next(data.length);
            });
        });
    }
}
