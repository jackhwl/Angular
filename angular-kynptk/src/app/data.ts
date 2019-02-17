import { Question, Option } from "./models";

export const questions: Question[] = [
    { id: 21, value: 'Which is the largest country in the world by population?' },
    { id: 22, value: 'When did the second world war end?' },
    { id: 23, value: 'Which was the first country to issue paper currency?' },
    { id: 24, value: 'Which city hosted the 1996 Summer Olympics?' },
    { id: 25, value: 'Who invented telephone?' }
  ];

export const options: Option[] = [
    { questionId: 21, id: 81, value: 'India', answer: false },
    { questionId: 21, id: 82, value: 'USA', answer: false },
    { questionId: 21, id: 83, value: 'China', answer: true },
    { questionId: 21, id: 84, value: 'Russia', answer: false },
    { questionId: 22, id: 85, value: '1945', answer: true },
    { questionId: 22, id: 86, value: '1939', answer: false },
    { questionId: 22, id: 87, value: '1944', answer: false },
    { questionId: 22, id: 88, value: '1942', answer: false },
    { questionId: 23, id: 89, value: 'USA', answer: false },
    { questionId: 23, id: 90, value: 'France', answer: false },
    { questionId: 23, id: 91, value: 'Italy', answer: false },
    { questionId: 23, id: 92, value: 'China', answer: true },
    { questionId: 24, id: 93, value: 'Atlanta', answer: true },
    { questionId: 24, id: 94, value: 'Sydney', answer: false },
    { questionId: 24, id: 95, value: 'Athens', answer: false },
    { questionId: 24, id: 96, value: 'Beijing', answer: false },
    { questionId: 25, id: 97, value: 'Albert Einstein', answer: false },
    { questionId: 25, id: 98, value: 'Alexander Graham Bell', answer: true },
    { questionId: 25, id: 99, value: 'Isaac Newton', answer: false },
    { questionId: 25, id: 100, value: 'Marie Curie', answer: false }
];