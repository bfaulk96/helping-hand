import {Component, OnInit} from '@angular/core';
import {CameraOptions} from '@ionic-native/camera';
import {Camera} from '@ionic-native/camera/ngx';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Component({
    selector: 'app-vision',
    templateUrl: './vision.page.html',
    styleUrls: ['./vision.page.scss'],
})
export class VisionPage implements OnInit {
    constructor(private camera: Camera,
                private httpClient: HttpClient) {
    }

    public url: string = 'https://vision.googleapis.com/v1/images:annotate?key=YOUR_API';

    public ngOnInit(): void {
    }

    public openCamera(): void {
        const options: CameraOptions = {
            quality: 1,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };

        this.camera.getPicture(options).then(
            (imageData: string): void => {
                const base64Image = 'data:image/jpeg;base64,' + imageData;
                this.sendImageToCloudVisionHandler(base64Image).subscribe((res) => {
                    console.log(res);
                }, (err) => {
                    console.log(err);
                });
            },
            (error: Error): void => {
                console.error(error);
            }
        );
    }

    public sendImageToCloudVisionHandler(content): Observable<any> {
        return this.httpClient.post(this.url, content);
    }

    getImageFromGallery() {

    }


}
