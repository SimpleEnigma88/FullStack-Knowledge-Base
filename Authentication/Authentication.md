# Authentication

From Copilot:

Authentication is the process of verifying the identity of a user or system. In the context of client-server communication, authentication is used to ensure that the client making a request to the server is who they claim to be.

There are several ways to authenticate a client to a server, including:

Basic authentication: The client sends a username and password with each request to the server. This method is simple but not very secure, as the credentials are sent in plaintext.

Token-based authentication: The client sends a token with each request to the server, which is used to verify the client's identity. This method is more secure than basic authentication, as the token can be encrypted and is typically short-lived.

OAuth: A protocol that allows a user to grant a third-party application access to their resources on another site without sharing their password. OAuth is commonly used by social media sites and other web applications.

**It's important to note that authentication is just one part of the security puzzle. Once a client is authenticated, the server must also authorize the client's requests to ensure that they have the appropriate permissions to access the requested resources.Authentication is the process of verifying the identity of a user or system. In the context of client-server communication, authentication is used to ensure that the client making a request to the server is who they claim to be.**

## How Authentication Works

Servers will check the login/password to authenticate the user and sends back a Token that is generated with a server side algorithm. This token is passed back to the client and is used to authenticate the user for each request. The token is usually stored in the client side in a cookie or in the local storage.

## Adding Authentication

add the component auth to the app.module.ts
``` typescript
import { AuthComponent } from './auth/auth.component';

@ngModule({
  declarations: [
    AppComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

```

add the component auth to the app-routing.module.ts
``` typescript
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent }
];

```

## Switching Between Auth Modes
auth.component.ts
``` typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  isLoginMode = true;

  constructor() { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
```

auth.service.ts
``` typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    signup(email: string, password: string) {
        // replace [API_KEY] (including the []) with authenticatoin key from the Firebase DB Authentication
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]', {
            email: email,
            password: password,
            returnSecureToken: true
        }).subscribe(response => {
            console.log(response);
        });

')
    }
}
```

auth.component.ts
``` typescript
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  isLoginMode = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return; // User should not be able to click the button if the form is not valid, but with dev tools it can be done, this is a second check for this.
        }
        const email = form.value.email;
        const password = form.value.password;

        if (this.isLoginMode) {
            // ...
        } else {
            this.authService.signup(email, password).subscribe(response => {
                console.log(response);
            }, error => {
                console.log(error);
            });
        }
                
        form.reset();
    }

}
```

/shared/loading-spinner/loading-spinner.component.css
``` css
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: black;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
```

/shared/loading-spinner/loading-spinner.component.ts
``` typescript
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-loading-spinner',
    template: '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>',
    styleUrls: ['./loading-spinner.component.css'],
});
export class LoadingSpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

```

Add the LoadingSpinnerComponent to the app.module.ts imports and declarations

``` typescript
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```

auth.component.ts
``` typescript
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return; 
        }
        const email = form.value.email;
        const password = form.value.password;

        this.isLoading = true;
        if (this.isLoginMode) {
            // ...
        } else {
            this.authService.signup(email, password).subscribe(response => {
                console.log(response);
                this.isLoading = false;
            }, error => {
                console.log(error);
                this.error = 'An error occurred!';
                this.isLoading = false;
            });
        }
                
        form.reset();
    }

}
```

auth.component.html
``` html
//...
<div class="alert alert-danger" *ngIf="error">
    <p>{{ error }}</p>
</div>

<div *ngIf="isLoading" sytle="text-align: center">
    <app-loading-spinner></app-loading-spinner>
</div>
<form #authForm="ngForm" (ngSubmit)="onSubmit(authForm)" *ngIf="!isLoading">

//...
```

## Improving Error Handling

auth.component.ts
``` typescript
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return; 
        }
        const email = form.value.email;
        const password = form.value.password;

        this.isLoading = true;
        if (this.isLoginMode) {
            // ...
        } else {
            this.authService.signup(email, password).subscribe(response => {
                console.log(response);
                this.isLoading = false;
            }, errorRes => {
                console.log(errorRes);
                switch (errorRes.error.error.message) {
                    case 'EMAIL_EXISTS':
                        this.error = 'This email exists already'; // This is not ideal, should be in the service using rsjx wrap operators
                }
                this.error = 'An error occurred!';
                this.isLoading = false;
            });
        }
                
        form.reset();
    }

}
```

auth.service.ts
``` typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

    constructor(private http: HttpClient) { }

    signup(email: string, password: string) {
        // replace [API_KEY] (including the []) with authenticatoin key from the Firebase DB Authentication
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]', {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(errorRes => {
            let errorMessage = 'An unknown error occurred!';
            if (!errorRes.error || !errorRes.error.error) {
                return throwError(errorMessage);
            }
            switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'This email exists already';
            }
            return throwError(errorMessage);
        }));
    }
}
```

auth.component.ts
``` typescript
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return; 
        }
        const email = form.value.email;
        const password = form.value.password;

        this.isLoading = true;
        if (this.isLoginMode) {
            // ...
        } else {
            this.authService.signup(email, password).subscribe(response => {
                console.log(response);
                this.isLoading = false;
            }, errorMessage => {
                console.log(errorMessage);
                this.error = errorMessage;
                this.isLoading = false;
            });
        }
                
        form.reset();
    }

}
```

## Sending Login Requests

### Login Method
The login method takes an email and a password as parameters. It sends a POST request to the Firebase Authentication API.

Replace [API_KEY] (including the brackets) with your authentication key from the Firebase DB Authentication.

auth.service.ts
``` typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

    constructor(private http: HttpClient) { }

    signup(email: string, password: string) {
        // replace [API_KEY] (including the []) with authenticatoin key from the Firebase DB Authentication
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]', {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(errorRes => {
            let errorMessage = 'An unknown error occurred!';
            if (!errorRes.error || !errorRes.error.error) {
                return throwError(errorMessage); // In case of an unknown error, it returns the default error message.
            }
            switch (errorRes.error.error.message) { // In case of an 'EMAIL_EXISTS' error, it updates the error message accordingly.
                case 'EMAIL_EXISTS':
                    errorMessage = 'This email exists already';
            }
            return throwError(errorMessage);
        }));
    }

    login(email: string, password: string) {
        // replace [API_KEY] (including the []) with authenticatoin key from the Firebase DB Authentication
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]', {
            email: email,
            password: password,
            returnSecureToken: true
        }).subscribe(response => {
            console.log(response);
        });
    }
}
```

auth.component.ts
``` typescript
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs';

import { AuthService, AuthResponseData } from './auth.service'; // import the exported interface from the auth.service.ts file

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) { }

    ngOnInit(): void {
    }

    onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return; 
        }
        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>; // Create a variable to store the observable from the signup or login method

        this.isLoading = true;
        if (this.isLoginMode) {
            authObs = this.authService.login(email, password)
        } else {
            authObs = this.authService.signup(email, password)
        }
        
        authObs.subscribe(response => {
            console.log(response);
            this.isLoading = false;
        }, errorMessage => {
            console.log(errorMessage);
            this.error = errorMessage;
            this.isLoading = false;
        }); // Much cleaner

        form.reset();
    }

}
```

**auth.service.ts**

We must also add export to the interface in the auth.service.ts file to be able to use it in the auth.component.ts file above.

``` typescript

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

```

## Login Error Handling

auth.service.ts
``` typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse from @angular/common/http

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

    constructor(private http: HttpClient) { }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]', {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(catchError(this.handleError)); // Useing the handleError method to handle errors, keeps it clean.
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]', {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(catchError(this.handleError)); // Useing the handleError method to handle errors, keeps it clean.
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage); 
        }
        switch (errorRes.error.error.message) { // Now we will be able to add additional error handling in the future alot easier.
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist.';
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct.';
        }
        return throwError(errorMessage);
    }
}
```

## Creating & Storing the User Data

user.model.ts
``` typescript
export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date
    ) {}

    get token() { // A getting is a method that is executed when a property is accessed, automatically validates the token.
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}
```
