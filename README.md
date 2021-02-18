# Pokédex

DEMO: https://jojo-pokedex.herokuapp.com/

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.1.

Most of server setup is from https://github.com/davideviolante/Angular-Full-Stack/

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

## Deployment (Pokedex angular app to Firebase)

Run `ng build --prod` against pokedex-app folder and all static files will be stored in dist/pokemon.
Copy all files under it to public folder and run `firebase deploy`.

## Deployment (Pokedex angular app to GitHub Pages)

Run `ng deploy --base-href=/pokedex/` against pokedex-app folder.

## Deployment (Pokedex express app to Firebase: [jojo-pokedex.web.app](https://jojo-pokedex.web.app))

Run `firebase deploy --only function,hosting` against functions folder.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
