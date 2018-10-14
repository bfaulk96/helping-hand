import {Component, OnInit, ViewChild} from '@angular/core';
import {CameraOptions} from "@ionic-native/camera";
import {Camera} from "@ionic-native/camera/ngx";
import {TranslateService} from "@ngx-translate/core";
import { CommonModule } from '@angular/common';

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
                public _DomSanitizationService: DomSanitizer,
                private translateService: TranslateService) {
    }

    // TODO: REMOVE ME
    public url: string = "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBnk7RwWycxst__c_VO1GtC6e9-jyQoNSs";
    public url_translate: string = "https://translation.googleapis.com/language/translate/v2?key=AIzaSyBnk7RwWycxst__c_VO1GtC6e9-jyQoNSs";
    public rawImage: string = "";
    public base64Image: string = "";
    public text: any;

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
            // this.error = res;
        }, (err) => {
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

    public translateText(text) {
        this.sendTextToCloudTranslateHandler(text).subscribe((res) => {
            this.text = res.data.translations[0].translatedText;
        }, (err) => {
        });
    }

    public sendTextToCloudTranslateHandler(text): Observable<any> {
        const currentLanguage = this.translateService.currentLang;
        const request = {};
        return this.httpClient.post(this.url_translate + "&q=" + text + "&target=" + currentLanguage, request);
    }

    public parseData(res) {
        if (this.translate) {
            this.text = res.responses[0].textAnnotations[0].description;
            this.text = this.text.replace("\\n", " ");


        } else {
            this.text = res.responses[0].labelAnnotations[0].description;
            this.text = this.text.replace("\\n", " ");
        }
        this.translateText(this.text);
    }

    public closePreview() {
        this.base64Image = "";
    }

}
