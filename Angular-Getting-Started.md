# Knowledge Base 

### [Codefi Codelabs](https://www.codefiworks.com/codelabs/ )

### [Pro Academind](https://pro.academind.com/)
#
#
#
### Academind Angular Course

[Course Structure](#structure)
___
##### Getting Started

- Node.js is a prerequisite

###### Process for seting up an Angular project folder.
---
Commands for installing Angular (**Command Prompt**)
`npm install -g @angular/cli@latest` - *@latest* is optional - installs Angular CLI
Change directory to deisgnated parent folder for your app `ls`  -- `cd/`
`ng new app-name --no-strict`  *no-strict* is not required in future apps.
Further reading: [Angular - Strict Mode](https://angular.io/guide/strict-mode)
Change directory to project folder `cd app-name/`

Start server on CLI
`ng serve`
Server will run the app in the browers at address:
`http://localhost:4200/`
The server will auto update any changes you make to the app, just like VSC Go Live ext.

##### Editing the Frist App
This was just a demostration of how the features of Angular can enact live changes to the browser window. Not too sure what you're looking at, but still a good demo.

##### The Course Structure
1. The Basics
2. Components and Databinding
3. Directives
4. Services & Dependency Injection
5. Routing
6. Observables
7. Forms
8. Pipes
9. Http
10. Authentication
11. Optimizations & NgModules
12. Deployment
13. Animations and Testing
14. Real Project

 ##### Basic Project adjustments
 Added Boostrap styles by adding the following code to the `"node_modules/bootstrap/dist/css/bootstrap.min.css",` to the styles section in the angular.json file in the project.
 ```
 "styles": [
              "node_modules/bootstrap/dist/css/bootstrap.min.css",
              "src/styles.css"
            ]
```
Also, delete the contents of the `export class AppComponent {}` function in the `/src/app/app.component.ts` file.