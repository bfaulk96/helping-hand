import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";

import {IonicModule} from "@ionic/angular";

import {ConnectPage} from "./connect.page";
import {TranslateModule} from "@ngx-translate/core";

const routes: Routes = [
    {
        path: "",
        component: ConnectPage
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
    declarations: [ConnectPage]
})
export class ConnectPageModule {
}
