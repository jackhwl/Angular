import { Product } from "./product";

export const PRODUCTS_MOCK: Product[] = [
 {
   productId: 1,
   productName: "Building Business Components using Angular",
   introductionDate: new Date('1/23/2017'),
   price: 20,
   url: 'http://bit.ly/2k5ogPH',
   categoryId: 2
 },
 {
   productId: 2,
   productName: "The Journey from MVC to Angular",
   introductionDate: new Date('7/22/2016'),
   price: 20,
   url: 'http://bit.ly/2a3wVNU',
   categoryId: 2
 },
 {
   productId: 3,
   productName: "Build an HTML Helper Library for ASP.NET MVC 5",
   introductionDate: new Date('1/05/2016'),
   price: 20,
   url: 'http://bit.ly/1myXBwj',
   categoryId: 2
 },
 {
   productId: 4,
   productName: "Mentoring Services",
   introductionDate: new Date('3/01/1991'),
   price: 200,
   url: 'http://www.fairwaytech.com',
   categoryId: 1
 }
];
