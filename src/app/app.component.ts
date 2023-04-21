import {Component, Inject} from '@angular/core';

import {Platform} from '@ionic/angular';
import {DOCUMENT} from '@angular/common';
import {AuthService} from './services/auth.service';
import {CurrentUser} from './DTOs/Account/CurrentUser';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    currentUser: CurrentUser = null;

    constructor(
        private platform: Platform,
        @Inject(DOCUMENT) private document: Document,
        private authService: AuthService,
        private cookieService: CookieService,
        private router: Router
    ) {
        this.document.documentElement.dir = 'rtl';
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
        });

        this.authService.getCurrentUser().subscribe(user => {
            this.currentUser = user;
        });

        this.authService.checkAdminAuth().subscribe(res => {
            if (res.status === 'Success') {
                const user = new CurrentUser(
                    res.data.userId,
                    res.data.firstName,
                    res.data.lastName,
                    res.data.address);

                this.authService.setCurrentUser(user);
            }
        });
    }

    logOutUser() {
        this.cookieService.delete('eshop-cookie');
        this.authService.setCurrentUser(null);
        this.router.navigate(['/']);
    }
}
