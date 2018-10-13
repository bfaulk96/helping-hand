import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

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
    {path: 'setup', loadChildren: './setup/setup.module#SetupPageModule' },
    {path: 'login', loadChildren: './login/login.module#LoginPageModule' },
    {path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' }


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
