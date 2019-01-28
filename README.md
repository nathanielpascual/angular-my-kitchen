# MyApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Fix in angular universal

Here the steps (you should remove the quotations marks ("") from the commands):
 
1. Use "npm cache verify" OR "npm cache clean", depending on your npm version. 
This will clean up the cache.
 
2a. If you don\'t care about the versions of your dependencies use "npm update". 
If you do that you can proceed to step 4, 
otherwise ignore this step and proceed to step 2b.
 
2b. Remove the node_modules folder
 
3. npm install
 
4. Build your app, then the server and then compile the server.ts file with webpack:
 
4a. If you added the scripts from the github wiki to your package.json you can use "npm run build:ssr"
and after that proceed to 5, otherwise ignore this step and proceed to 4b. 
This is a convenient shorthand command which will execute all 3 commands. 
Remember to change the server build part in the script to your own script, 
for example: "ng run n5-complete-guide:server"
 
4b. If you didn\'t add the scripts and only included the "webpack:server" part just like Max did, then do this:
4b.1 Build the app: "ng build --prod"
4b.2 Build the server: Example "ng run n5-complete-guide:server"
4b.3 Compile the server file: "npm run webpack:server" OR "webpack --config webpack.server.config.js --progress --colors"
 
5. After everything is built and compiled start the server with "node dist/server.js"
