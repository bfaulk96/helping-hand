import {Component, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {Platform} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {BehaviorSubject, Observable} from "rxjs/index";
import {take} from "rxjs/internal/operators";

@Component({
    selector: "app-setup",
    templateUrl: "./setup.page.html",
    styleUrls: ["./setup.page.scss"],
})
export class SetupPage implements OnInit {
    public choice: string;
    public welcome: string;
    public language: string = "en";

    public languages: string[] = ["bg", "en", "es", "ar"];

    private langSub: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    langObs: Observable<string> = this.langSub.asObservable();

    constructor(private platform: Platform,
                private translate: TranslateService,
                private router: Router,
                private storage: Storage) {
        if (!this.translate.currentLang) {
            this.translate.onLangChange
                .pipe(take(1))
                .subscribe(a => {
                    this.language = a.lang;
                    this.langSub.next(a.lang);
                });
        } else {
            this.language = this.translate.currentLang;
        }
    }

    ngOnInit() {
        let i = 0;
        setInterval(() => {
            if (i === this.languages.length) {
                i = 0;
            }
            this.languageSwitcher(i);
            i++;

        }, 2000);
    }

    languageSwitcher(index: number) {
        const lang = this.translate.currentLang;
        this.translate.use(this.languages[index]).subscribe(() => {
            this.welcome = this.translate.instant("setup.welcome");
            this.choice = this.translate.instant("setup.choice");
            this.translate.use(lang);
        });
    }

    public changeLanguage(): void {
        this.translateLanguage();
    }

    private translateLanguage(): void {
        this.translate.use(this.language);
    }

    private submit(): void {
        this.storage.set("language", this.language);
        this.router.navigate(["/home"]);
    }
}
