import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.route.queryParamMap.subscribe(
      (params) => {
        if(params.has("token")) {
          let token = params.get("token")
          this.authService.verify(token).subscribe(
            (verifyResponse: any): void => {
                console.log(verifyResponse);
            },
            (error: Error): void => {
                console.error(error);
            }
          );
        } else {
          console.error("No token")
        }
      },
      (error) => {
        console.error(error)
      }
    )
  }

  ngOnInit() {
  }

}
