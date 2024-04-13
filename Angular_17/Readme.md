# Enterprise Angular
- Domain model design 
    - Our goal is to define the domain model and data contract for our application
    - User, Challenges, Flashcards, Notes
    - lib is reusable component to all application
    - Matter interface
    - Generate matter library with nx:
    - npx nx g @nx/angular:library matters-data --directory=libs/matters-data --standalone=false --projectNameAndRootFormat=as-provided -d
