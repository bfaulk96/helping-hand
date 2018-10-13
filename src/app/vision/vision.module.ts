import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";

import {IonicModule} from "@ionic/angular";

import {VisionPage} from "./vision.page";
import {TranslateModule} from "@ngx-translate/core";

const routes: Routes = [
    {
        path: "",
        component: VisionPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        TranslateModule
    ],
    declarations: [VisionPage]
})
export class VisionPageModule {
}
