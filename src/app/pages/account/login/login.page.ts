import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { LoginUserViewModel } from '../../../DTOs/Account/LoginUserViewModel';
import { CurrentUser } from '../../../DTOs/Account/CurrentUser';
import { AlertController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private cookieService: CookieService
  ) {
  }

  ngOnInit(): void {

    // طریقه استفاده
    //میشه فایشن کرد
    // this.alertController.create({
    //   header: 'اعلان',
    //   message: 'پیام من به شما',
    //   buttons: ['اوکی', 'بیخیال']
    // }).then(alertEl => {
    //   alertEl.present();
    // });
    this.loginForm = new FormGroup({
      email: new FormControl(
        null,
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(100)
        ]
      ),
      password: new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]),
    });
  }

  submitLoginForm() {
    if (this.loginForm.valid) {
      const loginData = new LoginUserViewModel(
        this.loginForm.controls.email.value,
        this.loginForm.controls.password.value
      );

      this.authService.loginUser(loginData).subscribe(res => {
        const currentUser = new CurrentUser(
          res.data.userId,
          res.data.firstName,
          res.data.lastName,
          res.data.address
        );
        this.alertController.create({
          header: 'اعلان',
          message: res.data.message,
          buttons: ['اوکی']
        }).then(alertEl => {
          alertEl.present();
        });
        if (res.status === 'Success') {
          this.authService.setCurrentUser(currentUser);
          this.loginForm.reset();
          this.cookieService.set('eshop-admin-cookie', res.data.token, res.data.expireTime * 60);
          this.router.navigate(['/']);
        } else if (res.status === 'Error') {
        } else if (res.status === 'NotFound') {
        }
      });
    }
  }
}
