### Http Requests




## Using the catchError Operator

post.service.ts
``` typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})

export class PostsService {
    
        constructor(private http: HttpClient) { }
    
        createAndStorePost(title: string, content: string) {
            const postData: Post = {title: title, content: content};
            this.http
            .post<{ name: string }>(
                'https://ng-complete-guide-6f5a0.firebaseio.com/posts.json',
                postData
            ).subscribe(responseData => {
                console.log(responseData);
            }, error => {
                console.log(error);
            });
        }
    
        fetchPosts() {
            this.http
            .get<{ [key: string]: Post }>(
                'https://ng-complete-guide-6f5a0.firebaseio.com/posts.json'
                )
            .pipe(
                map(responseData => {
                    const postsArray: Post[] = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            postsArray.push({ ...responseData[key], id: key });
                        }
                    }
                    return postsArray;
                }),
                catchError(errorRes => {
                    // Send to analytics server
                    return throwError(errorRes);
                })
                );
        }
    
        deletePosts() {
            return this.http.delete('https://ng-complete-guide-6f5a0.firebaseio.com/posts.json');
        }
    }
}

```

app.component.ts
``` typescript

onFetchPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
    }, error => {
        this.isFetching = false; // to get rid of the Loading... text
        this.error = error.message;
        console.log(error);
    });
}

onHandleError() {
    this.error = null;
}

```

app.component.html
``` html

<div class="row">
   <h1>An Error Occurred!</h1>
    <p>{{ error }}</p>
    <button class="btn btn-primary" (click)="onHandleError()">Close</button>
</div>

```

## Setting Headers

posts.service.ts
``` typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})

export class PostsService {
    
        constructor(private http: HttpClient) { }
    
        createAndStorePost(title: string, content: string) {
            const postData: Post = {title: title, content: content};
            this.http
            .post<{ name: string }>(
                'https://ng-complete-guide-6f5a0.firebaseio.com/posts.json',
                postData,
                {
                    observe: 'response' // This will give us access to the full response, not just the body.
                }
            ).subscribe(responseData => {
                console.log(responseData);
            }, error => {
                console.log(error);
            });
        }
    
        fetchPosts() {
            this.http
            .get<{ [key: string]: Post }>(
                'https://ng-complete-guide-6f5a0.firebaseio.com/posts.json',
                {
                    headers: new HttpHeaders({'Custom-Header': 'Hello'}) // This will add a custom header to the request.
                }
                )
            .pipe(
                map(responseData => {
                    const postsArray: Post[] = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            postsArray.push({ ...responseData[key], id: key });
                        }
                    }
                    return postsArray;
                }),
                catchError(errorRes => {
                    // Send to analytics server
                    return throwError(errorRes);
                })
                );
        }
    
        deletePosts() {
            return this.http.delete('https://ng-complete-guide-6f5a0.firebaseio.com/posts.json');
        }
    }
}

```

## Adding Query Params

posts.service.ts
``` typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'; // Import HttpParams from @angular/common/http

import { catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})

export class PostsService {
    
        constructor(private http: HttpClient) { }
    
        createAndStorePost(title: string, content: string) {
            const postData: Post = {title: title, content: content};
            return this.http
            .post<{ name: string }>(
                'https://ng-complete-guide-6f5a0.firebaseio.com/posts.json',
                postData,
                {
                    observe: 'response' // This will give us access to the full response, not just the body.
                }
            ).subscribe(responseData => {
                console.log(responseData);
            }, error => {
                console.log(error);
            });
        }
    
        fetchPosts() {
            return this.http
            .get<{ [key: string]: Post }>(
                'https://ng-complete-guide-6f5a0.firebaseio.com/posts.json',
                {
                    headers: new HttpHeaders({'Custom-Header': 'Hello'}), // This will add a custom header to the request.
                    params: new HttpParams().set('print', 'pretty') // This will add a query param to the request.
                }
                )
            .pipe(
                map(responseData => {
                    const postsArray: Post[] = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            postsArray.push({ ...responseData[key], id: key });
                        }
                    }
                    return postsArray;
                }),
                catchError(errorRes => {
                    // Send to analytics server
                    return throwError(errorRes);
                })
                );
        }
    
        deletePosts() {
            return this.http.delete('https://ng-complete-guide-6f5a0.firebaseio.com/posts.json');
        }
    }
}

```

## Observing Different Types of Responses

posts.service.ts
``` typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventTypes } from '@angular/common/http'; // Import HttpParams, HttpEventTypes from @angular/common/http

import { map, catchError, tap } from 'rxjs/operators'; // Import tap from rxjs/operators
import { Subject, throwError } from 'rxjs';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})

export class PostsService {
    
        constructor(private http: HttpClient) { }
    
        createAndStorePost(title: string, content: string) {
            const postData: Post = {title: title, content: content};
            return this.http
            .post<{ name: string }>(
                'https://ng-complete-guide-6f5a0.firebaseio.com/posts.json',
                postData,
                {
                    observe: 'response' // This will give us access to the full response, not just the body.
                }
            ).subscribe(responseData => {
                console.log(responseData);
            }, error => {
                console.log(error);
            });
        }
    
        fetchPosts() {
            return this.http
            .get<{ [key: string]: Post }>(
                'https://ng-complete-guide-6f5a0.firebaseio.com/posts.json',
                {
                    headers: new HttpHeaders({'Custom-Header': 'Hello'}), // This will add a custom header to the request.
                    params: new HttpParams().set('print', 'pretty') // This will add a query param to the request.
                }
                )
            .pipe(
                map(responseData => {
                    const postsArray: Post[] = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            postsArray.push({ ...responseData[key], id: key });
                        }
                    }
                    return postsArray;
                }),
                catchError(errorRes => {
                    // Send to analytics server
                    return throwError(errorRes);
                })
                );
        }
    
        deletePosts() {
            return this.http.delete(
            'https://ng-complete-guide-6f5a0.firebaseio.com/posts.json',
            {
                observe: 'events' // This will give us access to the full response, not just the body.
            }
            ).pipe(tap(event => {
                console.log(event);
                if (event.type === HttpEventTypes.Sent) {
                    // ...
                }
                if (event.type === HttpEventTypes.Response) {
                    console.log(event.body);
                }

            }));
        }
    }
}

```

## Changing the Response Body Type

posts.service.ts
``` typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventTypes } from '@angular/common/http'; 

import { map, catchError, tap } from 'rxjs/operators'; 
import { Subject, throwError } from 'rxjs';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})

export class PostsService {
    
        constructor(private http: HttpClient) { }
    
        createAndStorePost(title: string, content: string) {
            const postData: Post = {title: title, content: content};
            return this.http
            .post<{ name: string }>(
                'https://ng-complete-guide-6f5a0.firebaseio.com/posts.json',
                postData,
                {
                    observe: 'response' 
                }
            ).subscribe(responseData => {
                console.log(responseData);
            }, error => {
                console.log(error);
            });
        }
    
        fetchPosts() {
            return this.http
            .get<{ [key: string]: Post }>(
                'https://ng-complete-guide-6f5a0.firebaseio.com/posts.json',
                {
                    headers: new HttpHeaders({'Custom-Header': 'Hello'}), 
                    params: new HttpParams().set('print', 'pretty').
                    responseType: 'json', // 'text' will change the response type to text. Default is json. 'blob' is also an option. Need to look that up. This will throw an error because of the typing of the .get<{ [key: string]: Post }> method. We need to change that to any to make it work.
                }
                )
            .pipe(
                map(responseData => {
                    const postsArray: Post[] = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            postsArray.push({ ...responseData[key], id: key });
                        }
                    }
                    return postsArray;
                }),
                catchError(errorRes => {
                    return throwError(errorRes);
                })
                );
        }
    
        deletePosts() {
            return this.http.delete(
            'https://ng-complete-guide-6f5a0.firebaseio.com/posts.json',
            {
                observe: 'events',
                responseType: 'text' // This will change the response type to text. Default is json. 'blob' is also an option. Need to look that up.
            }
            ).pipe(tap(event => {
                console.log(event);
                if (event.type === HttpEventTypes.Sent) {
                    // ...
                }
                if (event.type === HttpEventTypes.Response) {
                    console.log(event.body);
                }

            }));
        }
    }
}

```

## Introducing Interceptors

auth-interceptor.service.ts
``` typescript
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor { // runs on every http request leaving the app
    intercept(req: HttpRequest<any>, next: HttpHandler) { // intercept takes 2 arguments, the request and the next handler
        console.log('Request is on its way');
        return next.handle(req); // releases the request to continue its journey
    }
}

```

app.module.ts
``` typescript
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { ngModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Imports...

import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS, // setup the interceptor
    useClass: AuthInterceptorService, // choose which service to use as the interceptor
    multi: true // set to true if you want to use multiple interceptors
  }],
  bootstrap: [AppComponent]
})
```

## Manipulating Request Objects

Inside the interceptor, not only can you log the request, but you can also manipulate it. For example, you can add headers to it.

auth-interceptor.service.ts
``` typescript
import { 
    HttpInterceptor, 
HttpRequest, 
HttpHandler 
} from '@angular/common/http';


export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Request is on its way');
        const modifiedRequest = req.clone({headers: req.headers.append('Auth', 'xyz')}); // This will add a header to the request
        return next.handle(modifiedRequest); // instead of passing the original request, we pass the modified request to the next step. Very handy if all requests need to have a certain header or other modifications.
    }
}

```

## Response Interceptors

You can also modify the response from http requests using interceptors.

auth-interceptor.service.ts
``` typescript
import { 
    HttpInterceptor, 
    HttpRequest, 
    HttpHandler 
    } from '@angular/common/http';
import { tap } from 'rxjs/operators'; // Tap allows you to execute code on the response without altering it.

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Request is on its way');
        const modifiedRequest = req.clone({headers: req.headers.append('Auth', 'xyz')}); 
        return next.handle(modifiedRequest).pipe(tap(event => {
            console.log(event);
            if (event.type === HttpEventTypes.Response) {
                console.log('Response arrived, body data: '); // We are only logging here, but methods like .map would allow us to transform the response before sending it on it's way to the next step. MUST BE CAREFUL WITH THIS, CAN BREAK THE APP.
                console.log(event.body);
            }
        })); 
    
    }
}

```

## Multiple Interceptors

logging-interceptor.service.ts
``` typescript
import { 
    HttpInterceptor, 
    HttpRequest, 
    HttpHandler, 
    HttpEventTypes 
    } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class LoggingInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Outgoing request');
        console.log(req.url);
        console.log(req.headers); // The headers are added by the auth-interceptor.service.ts and this interceptor is dependent on that one, so it must be added after the auth-interceptor.service.ts in the app.module.ts file.
        return next.handle(req).pipe(tap(event => {
            if (event.type === HttpEventTypes.Response) {
                console.log('Incoming response');
                console.log(event.body);
            }
        })); 
    
    }
}

``` 

app.module.ts
``` typescript
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { ngModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 

import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [  // The order the interceptors are provided in here is the order they will be executed in. This can make a difference if one interceptor is dependant on another or if one interceptor needs to be executed before another or data is being manipulated by one interceptor that another interceptor needs to use, etc...
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true 
  },
  {
    provide: HTTP_INTERCEPTORS, // setup the new interceptor
    useClass: LoggingInterceptorService,
    multi: true 
  }],
  bootstrap: [AppComponent]
})
```

## Wrap up

It's important to remember that http requests return observables, so you can use all the rxjs operators on them. You can also chain multiple operators together to transform the response before it is sent to the next step.

Always be mindful of the type of data you are expecting and sending. If you are expecting a json response, make sure you set the responseType to json. If you are sending a json object, make sure you set the headers to json.

