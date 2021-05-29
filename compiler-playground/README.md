https://ultimatecourses.com/blog/angular-dependency-injection
https://indepth.dev/posts/1204/a-deep-deep-deep-deep-deep-dive-into-the-angular-compiler
https://dev.to/ajitsinghkaler/typescript-compiler-an-overview-5f42

                                                                |------------|
                           |----------------------------------> | TypeScript |
                           |                                    |   .d.ts    |
                           |                                    |------------|
                           |

|------------| |-----| |-----| |------------|
| TypeScript | -parse-> | AST | ->transform-> | AST | ->print-> | JavaScript |
| source | | |-----| | |-----| | source |
|------------| | | | |------------|
| type-check |
| | |
| v |
| |--------| |
|--> | errors | <---|
|--------|

https://dev.to/ajitsinghkaler/angular-compiler-ngtsc-271l

https://lihautan.com/step-by-step-guide-for-writing-a-babel-transformation/
https://medium.com/basecs/leveling-up-ones-parsing-game-with-asts-d7a6fc2400ff
