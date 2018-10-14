import {Component, OnInit, ViewChild} from '@angular/core';
import {CameraOptions} from "@ionic-native/camera";
import {Camera} from "@ionic-native/camera/ngx";

import {DomSanitizer} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Component({
    selector: "app-vision",
    templateUrl: "./vision.page.html",
    styleUrls: ["./vision.page.scss"],
    providers: [Camera]
})
export class VisionPage implements OnInit {
    constructor(private camera: Camera,
                private httpClient: HttpClient,
                public _DomSanitizationService: DomSanitizer) {
    }

    public url: string = "https://vision.googleapis.com/v1/images:annotate?key=";
    public rawImage: string = "";
    public base64Image: string = "";
    public error: any;

    public translate: boolean = false;

    @ViewChild('translateRadio') translateRadio: any;
    @ViewChild('objectRadio') objectRadio: any;

    public ngOnInit(): void {

    }

    public takePicture(): void {
        const options: CameraOptions = {
            quality: 1,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };

        this.camera.getPicture(options).then(
            (imageData: string): void => {
                this.rawImage = imageData;
                this.base64Image = "data:image/jpeg;base64," + imageData;
            },
            (error: Error): void => {
                console.error(error);
            }
        );
    }

    public sendPicture(): void {
        this.sendImageToCloudVisionHandler(this.rawImage).subscribe((res) => {
            this.parseData(res);
            this.error = res;
        }, (err) => {
            console.log(err);
            this.error = err;
        });
    }

    public sendImageToCloudVisionHandler(content): Observable<any> {
        this.translate = !this.objectRadio.checked;
        let type: string;
        if (this.translate) {
            type = "DOCUMENT_TEXT_DETECTION";
        } else {
            type = "LABEL_DETECTION";
        }
        const request = {
            "requests": [
                {
                    "image": {
                        "content": content
                    },
                    "features": [
                        {
                            "type": type,
                            "maxResults": 1
                        }
                    ]
                }
            ]
        };
        return this.httpClient.post(this.url, request);
    }

    public parseData(res) {
        if (this.translate) {




        } else {



        }
    }

    public closePreview() {
        this.base64Image = "";
    }


}
