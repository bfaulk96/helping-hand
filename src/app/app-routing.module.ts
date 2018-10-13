import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomePageModule'
    },
    {path: 'about', loadChildren: './about/about.module#AboutPageModule'},
    {path: 'contact', loadChildren: './contact/contact.module#ContactPageModule'},
    {path: 'resources', loadChildren: './resources/resources.module#ResourcesPageModule'},
    {path: 'register', loadChildren: './register/register.module#RegisterPageModule'},
    {path: 'login', loadChildren: './login/login.module#LoginPageModule'},
    {path: 'vision', loadChildren: './vision/vision.module#VisionPageModule'},
    {path: 'verify', loadChildren: './verify/verify.module#VerifyPageModule'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
