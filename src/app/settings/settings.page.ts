import {Component, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";

@Component({
    selector: "app-settings",
    templateUrl: "./settings.page.html",
    styleUrls: ["./settings.page.scss"],
})
export class SettingsPage implements OnInit {
    public language: string = "en";
    public languages: string[] = ["en", "es", "ar"];

    constructor(private translate: TranslateService,
                private router: Router) {
    }

    public ngOnInit(): void {
    }

    public changeLanguage(): void {
        this.translateLanguage();
    }

    private translateLanguage(): void {
        this.translate.use(this.language);
    }

    public checkCurrentLang(language: string) {
        return language === this.translate.currentLang;
    }

    public applySettings(): void {
        this.router.navigate(["home"]);
    }
}
