import "jest-preset-angular/setup-jest";
import "@testing-library/jest-dom";

//The Window object mocking 
Object.defineProperty(window, "CSS", { value: null });
// Object.defineProperty(window, "getComputedStyle", {
//   value: () => {
//     return {
//       display: "none",
//       appearance: ["-webkit-appearance"]
//     };
//   }
// });

// HTML Template parsing using docType
Object.defineProperty(document, "doctype", {
  value: "<!DOCTYPE html>"
});
Object.defineProperty(document.body.style, "transform", {
  value: () => {
    return {
      enumerable: true,
      configurable: true
    };
  }
});
