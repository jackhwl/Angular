# Coding Assignment

The goal of this assignment is to showcase your ability to develop features and your coding style. Due to the time constraint you will have to prioritize what you work on, and have to try and balance cleanliness with just getting it done.

Even though the app is small, one can easily spend the whole week working on it: perfecting styles, testing every single method, or carefully crafting every single line of code. Please don't! Do as much as you can in about two hours and share the results.

The most important part of the interview will come after this one, when we look at the app together, talk about the decisions you have made, etc..

## Stackblitz vs local development

You can work on the application directly in Stackblitz, or you can download the code and work on it locally in your own IDE.

## Ticketing managing application

Build a ticket managing app, where the user can add, filter, assign, and complete tickets.

- The app should have two screens: the list screen and the details screen. Please use the Angular router to manage the transitions between them.
- Even though we tend to use NgRx for state management, you can use a different approach if you think it fits better.
- Write a couple of tests. The goal here is not to build a production-quality app, so don't test every single detail. Two or three tests should be good enough.
- Don't forget about error handling and race conditions. The API server has a random delay. If you bump it up to say 10 seconds, would the app still work correctly?

## Submitting your solution

Please send us the link to your Stackblitz fork. We will continue to work on it during the pair-programming sessions. Please also indicate approximately how long you spent on the submission.

# [use jest to replace jasmine & karma](https://itnext.io/angular-testing-series-how-to-add-jest-to-angular-project-smoothly-afffd77cc1cb)

npm install jest jest-preset-angular @types/jest --save-dev
npm uninstall karma karma-chrome-launcher karma-coverage-istanbul-reporter karma-jasmine karma-jasmine-html-reporter

## Key Differences Between Reactive Forms and Template-Driven Forms

Reactive forms are synchronous in nature, whereas template-driven forms are asynchronous.
The data model in reactive forms is more structured than template-driven forms.
Form validations in reactive forms are handled through functions, whereas in template-driven forms they are handled through directives.
Reactive forms are immutable in nature, whereas template-driven forms are mutable.
Reactive forms are more explicit and created in the component class and template-driven forms are less explicit and created by directives.

- The createAction function returns a function, that when called returns an object in the shape of the Action interface.
- https://ncjamieson.com/how-to-reduce-action-boilerplate/
 - ngrx source code: platform - modules - store
 - reducer on function use rest parameters
 - effect: service-based application vs store-based application
 - entity: export const adapter = creteEntityAdapter<Course>({
     sortComparer: compareCourse,
     selectId: course => course.courseId
 })
  - https://blog.angular-university.io/angular-ngrx-store-and-effects-crash-course/

  - Add Delete Phone in Nested Entity, will refresh all fields in form, previous change will be lost.
  - https://timdeschryver.dev/blog/nested-ngrx-entity-state#example-code
