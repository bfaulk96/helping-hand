import {Component, OnInit} from "@angular/core";
import {CameraOptions} from "@ionic-native/camera";
import {Camera} from "@ionic-native/camera/ngx";

@Component({
    selector: "app-vision",
    templateUrl: "./vision.page.html",
    styleUrls: ["./vision.page.scss"],
})
export class VisionPage implements OnInit {
    constructor(private camera: Camera) {
    }

    public ngOnInit(): void {
    }

    public openCamera(): void {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };

        this.camera.getPicture(options).then(
            (imageData: string): void => {
                const base64Image = "data:image/jpeg;base64," + imageData;
            },
            (error: Error): void => {
                console.error(error);
            }
        );
    }
}
