# Knowledge Base 

### [Codefi Codelabs](https://www.codefiworks.com/codelabs/ )

### [Pro Academind](https://pro.academind.com/)
#
#
#
### Academind Angular Course - Basics

#### Angular Apps, Loading and Starting

1. Angular injects several Javascript bundles into the HTML loading. 

2. `main.ts` gets loaded first, in this file the following line tells angular to incorporate the app into the browser.
 `import { AppModule } from './app/app.module';`

3. I think the app.component files under `/app/` give further instructions on loading components and inserting them into the `<app-root> </app-root>` html node.

#### Components are Important

Reusability! Being able to work on different parts without affecting the whole. Gives structure to complexity.

#### Creating a New Component

folder names should be literal enough to give indication of it's purpose.
Best practices for file names are usually constructed `app.component.ts` `app.component.html`

Basic TS component file

```
import { Component } from "@angular/core";  // 3. We have to import what we need from the Angular packages installed.

@Component({                                // 2. @Component to tell Angular what this is, selector and where to look
  selector: 'app-server',                   // again, the format, app-nameOfComponent, is best practice.
  templateUrl: './server.component.html'
})

export class ServerComponent {              // 1. same class structure so far

}
```


#### AppModule and Component Declaration

Do not add file types to end of imports, these are added by webpack when built. ex.
`import { ServerComponent } from './server/server.component';`   the .ts is not needed

```
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ServerComponent } from './server/server.component';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }
```
Angular is broken up into many modules, we have to import these modules or parts of them to get the functionality we need. Seems similar to import javascript libraries like lodash, or others.


#### Custom Components/ Nesting

`ng generate component *filename*`

This will create a new folder under `/app/`
It will contain css, html and ts files.

We can nest modules by calling one from the other. 

`app.component.html` calls
`<app-servers></app-servers>`

Then, `servers.component.html` calls

`<app-server></app-server>`   //Take note one is plural, the other, not.
`<app-server></app-server>`

Whose content is `<p>The Server Component</p>`


#### Component Styles
Application styling can be added to the `app.component.ts` file:

```
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['/app.component.css']
  styles: ['
  h3 {
    color:dodgerBlue;
  }
']
)}
export class AppComponent {
}
```

---------------------------------



