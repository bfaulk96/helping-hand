import {Component, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs/index";
import {take} from "rxjs/internal/operators";
import {Storage} from '@ionic/storage';

@Component({
    selector: "app-settings",
    templateUrl: "./settings.page.html",
    styleUrls: ["./settings.page.scss"],
})
export class SettingsPage implements OnInit {
    public language: string = null;
    public languages: string[] = [
        'af', 'sq', 'ar', 'az', 'eu', 'bn', 'be', 'bg', 'ca', 'zh-CN', 'zh-TW', 'hr',
        'cs', 'da', 'nl', 'en', 'eo', 'et', 'tl', 'fi', 'fr', 'gl', 'ka', 'de', 'el',
        'gu', 'ht', 'iw', 'hi', 'hu', 'is', 'id', 'ga', 'it', 'ja', 'kn', 'ko', 'la',
        'lv', 'lt', 'mk', 'ms', 'mt', 'no', 'fa', 'pl', 'pt', 'ro', 'ru', 'sr', 'sk',
        'sl', 'es', 'sw', 'sv', 'ta', 'te', 'th', 'tr', 'uk', 'ur', 'vi', 'cy', 'yi'
    ];

    private langSub: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    langObs: Observable<string> = this.langSub.asObservable();

    constructor(private translate: TranslateService,
                private router: Router,
                private storage: Storage) {
        if (!this.translate.currentLang) {
            this.storage.get("language").then(lang => {
                if (lang) {
                    this.language = lang;
                } else {
                    this.language = "en";
                }
            })
        } else {
            this.language = this.translate.currentLang;
        }
    }

    public ngOnInit(): void {
    }

    public changeLanguage(): void {
        this.translateLanguage();
    }

    private translateLanguage(): void {
        this.translate.use(this.language);
        this.storage.set("language", this.language);
    }

    public applySettings(): void {
        this.storage.set("language", this.language);
        this.router.navigate(["/home"]);
    }
}
