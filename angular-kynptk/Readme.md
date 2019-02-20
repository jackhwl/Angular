Please use the following questions to build a simple quiz app. Initial score will be 0, each correct answer should add 1 point to the score, and show the final score once the quiz is completed.

The app should be a single page app, which starts with a welcome screen, click "Start the Quiz" button on the welcome screen to show questions. Only show one question at a time, and each question need to have 4 available options (radio buttons) for user to select. Once user finishes the last question, show the final score.

Question 1: Which is the largest country in the world by population?
Options: India, USA, China, Russia
Correct Answer: China

Question 2: When did the second world war end?
Options: 1945, 1939, 1944, 1942
Correct Answer: 1945

Question 3: Which was the first country to issue paper currency?
Options: USA, France, Italy, China
Correct Answer: China

Question 4: Which city hosted the 1996 Summer Olympics?
Options: Atlanta, Sydney, Athens, Beijing
Correct Answer: Atlanta

Question 5: Who invented telephone?
Options: Albert Einstein, Alexander Graham Bell, Isaac Newton, Marie Curie
Correct Answer: Alexander Graham Bell

https://stackblitz.com/edit/angular-jyasyy

data: two tables
models:
routing: use resolve in quiz route
logging:
error service: DI replace Error handler
fake.api.service: 1. fake api call, 2. backend business logic

app.component: footer use svg,
welcome: Be a millionair, one word, make the button abosulte, in order to mouseover change follow wording
quiz: show all questions, only display once a time, hide unnecessary button, once past last show submit, 
    pass quiz and sequence to question component, emit onchange event from question,
    use service share guesses.
score: use cdn to load image