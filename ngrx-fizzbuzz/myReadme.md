## Initial project setup

- ng new ngrx-fizzbuzz
- cd ngrx-fizzbuzz
- ng add @ngrx/store
- ng add @ngrx/effects --spec=false --group=true
- ng add @ngrx/store-devtools
- yarn add @ngrx/schematics --dev # ng-add support coming soon!

## Creating the FizzBuzz reducer

- ng generate @ngrx/schematics:reducer fizzbuzz --group=true --skipTests  
  -ng generate @ngrx/schematics:reducer fizzbuzz --reducers=reducers/index.ts --group=true --spec=false
