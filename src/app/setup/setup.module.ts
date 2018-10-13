import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {SetupPage} from './setup.page';
import {TranslateModule} from '@ngx-translate/core';


const routes: Routes = [
    {
        path: '',
        component: SetupPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TranslateModule,
        RouterModule.forChild(routes)
    ],
    declarations: [SetupPage]
})
export class SetupPageModule {
}
