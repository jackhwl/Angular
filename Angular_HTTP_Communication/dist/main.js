(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/add-book/add-book.component.html":
/*!**************************************************!*\
  !*** ./src/app/add-book/add-book.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"col-lg-5\">\r\n  <div class=\"well bs-component\">\r\n    <form #addBookForm=\"ngForm\" (ngSubmit)=\"saveBook(addBookForm.value)\" class=\"form-horizontal\">\r\n      <fieldset>\r\n        <legend>Add New Book</legend>\r\n        <div class=\"form-group\">\r\n          <label for=\"inputTitle\" class=\"col-lg-3 control-label\">Title</label>\r\n          <div class=\"col-lg-8\">\r\n            <input type=\"text\" class=\"form-control\" id=\"inputTitle\" placeholder=\"Title\" name=\"title\" ngModel>\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <label for=\"inputAuthor\" class=\"col-lg-3 control-label\">Author</label>\r\n          <div class=\"col-lg-8\">\r\n            <input type=\"text\" class=\"form-control\" id=\"inputAuthor\" placeholder=\"Author\" name=\"author\" ngModel>\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <label for=\"inputYear\" class=\"col-lg-3 control-label\">Year</label>\r\n          <div class=\"col-lg-8\">\r\n            <input type=\"text\" class=\"form-control\" id=\"inputYear\" placeholder=\"Year Published\" name=\"publicationYear\" ngModel>\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <div class=\"col-lg-8 col-lg-offset-3\">\r\n            <button type=\"submit\" class=\"btn btn-primary\">Save</button>\r\n          </div>\r\n        </div>\r\n      </fieldset>\r\n    </form>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/add-book/add-book.component.ts":
/*!************************************************!*\
  !*** ./src/app/add-book/add-book.component.ts ***!
  \************************************************/
/*! exports provided: AddBookComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddBookComponent", function() { return AddBookComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var app_core_data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/data.service */ "./src/app/core/data.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AddBookComponent = /** @class */ (function () {
    function AddBookComponent(dataService) {
        this.dataService = dataService;
    }
    AddBookComponent.prototype.ngOnInit = function () { };
    AddBookComponent.prototype.saveBook = function (formValues) {
        var newBook = formValues;
        newBook.bookID = 0;
        console.log(newBook);
        this.dataService.addBook(newBook)
            .subscribe(function (data) { return console.log(data); }, function (err) { return console.log(err); });
        console.warn('Save new book not yet implemented.');
    };
    AddBookComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-book',
            template: __webpack_require__(/*! ./add-book.component.html */ "./src/app/add-book/add-book.component.html"),
            styles: []
        }),
        __metadata("design:paramtypes", [app_core_data_service__WEBPACK_IMPORTED_MODULE_1__["DataService"]])
    ], AddBookComponent);
    return AddBookComponent;
}());



/***/ }),

/***/ "./src/app/add-reader/add-reader.component.html":
/*!******************************************************!*\
  !*** ./src/app/add-reader/add-reader.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"col-lg-5\">\r\n  <div class=\"well bs-component\">\r\n    <form #addReaderForm=\"ngForm\" (ngSubmit)=\"saveReader(addReaderForm.value)\" class=\"form-horizontal\">\r\n      <fieldset>\r\n        <legend>Add Reader</legend>\r\n        <div class=\"form-group\">\r\n          <label for=\"inputGoal\" class=\"col-lg-3 control-label\">Name</label>\r\n          <div class=\"col-lg-8\">\r\n            <input type=\"text\" class=\"form-control\" id=\"inputGoal\" placeholder=\"Name\" name=\"name\" ngModel>\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <label for=\"inputGoal\" class=\"col-lg-3 control-label\">Weekly Goal</label>\r\n          <div class=\"col-lg-8\">\r\n            <input type=\"text\" class=\"form-control\" id=\"inputGoal\" placeholder=\"Weekly Goal\" name=\"weeklyReadingGoal\" ngModel>\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <label for=\"inputTotal\" class=\"col-lg-3 control-label\">Total Read</label>\r\n          <div class=\"col-lg-8\">\r\n            <input type=\"text\" class=\"form-control\" id=\"inputTotal\" placeholder=\"Total Minutes Read\" name=\"totalMinutesRead\" ngModel>\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <div class=\"col-lg-10 col-lg-offset-3\">\r\n            <button type=\"submit\" class=\"btn btn-primary\">Save</button>\r\n          </div>\r\n        </div>\r\n      </fieldset>\r\n    </form>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/add-reader/add-reader.component.ts":
/*!****************************************************!*\
  !*** ./src/app/add-reader/add-reader.component.ts ***!
  \****************************************************/
/*! exports provided: AddReaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddReaderComponent", function() { return AddReaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AddReaderComponent = /** @class */ (function () {
    function AddReaderComponent() {
    }
    AddReaderComponent.prototype.ngOnInit = function () { };
    AddReaderComponent.prototype.saveReader = function (formValues) {
        var newReader = formValues;
        newReader.readerID = 0;
        console.log(newReader);
        console.warn('Save new reader not yet implemented.');
    };
    AddReaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-reader',
            template: __webpack_require__(/*! ./add-reader.component.html */ "./src/app/add-reader/add-reader.component.html"),
            styles: []
        }),
        __metadata("design:paramtypes", [])
    ], AddReaderComponent);
    return AddReaderComponent;
}());



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_add_book_add_book_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/add-book/add-book.component */ "./src/app/add-book/add-book.component.ts");
/* harmony import */ var app_add_reader_add_reader_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/add-reader/add-reader.component */ "./src/app/add-reader/add-reader.component.ts");
/* harmony import */ var app_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/dashboard/dashboard.component */ "./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var app_edit_book_edit_book_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/edit-book/edit-book.component */ "./src/app/edit-book/edit-book.component.ts");
/* harmony import */ var app_edit_reader_edit_reader_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/edit-reader/edit-reader.component */ "./src/app/edit-reader/edit-reader.component.ts");
/* harmony import */ var _core_books_resolver_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./core/books-resolver.service */ "./src/app/core/books-resolver.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var routes = [
    { path: 'dashboard', component: app_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_4__["DashboardComponent"], resolve: { resolvedBooks: _core_books_resolver_service__WEBPACK_IMPORTED_MODULE_7__["BooksResolverService"] } },
    { path: 'addbook', component: app_add_book_add_book_component__WEBPACK_IMPORTED_MODULE_2__["AddBookComponent"] },
    { path: 'addreader', component: app_add_reader_add_reader_component__WEBPACK_IMPORTED_MODULE_3__["AddReaderComponent"] },
    { path: 'editreader/:id', component: app_edit_reader_edit_reader_component__WEBPACK_IMPORTED_MODULE_6__["EditReaderComponent"] },
    { path: 'editbook/:id', component: app_edit_book_edit_book_component__WEBPACK_IMPORTED_MODULE_5__["EditBookComponent"] },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-default\">\r\n    <div class=\"container-fluid\">\r\n        <!-- Brand and toggle get grouped for better mobile display -->\r\n        <div class=\"navbar-header\">\r\n            <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\r\n                <span class=\"sr-only\">Toggle navigation</span>\r\n                <span class=\"icon-bar\"></span>\r\n                <span class=\"icon-bar\"></span>\r\n                <span class=\"icon-bar\"></span>\r\n            </button>\r\n            <a class=\"navbar-brand\" [routerLink]=\"['/dashboard']\">Book Tracker</a>\r\n        </div>\r\n\r\n        <!-- Collect the nav links, forms, and other content for toggling -->\r\n        <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\r\n            <ul class=\"nav navbar-nav\">\r\n                <li><a [routerLink]=\"['/addbook']\">Add Book<span class=\"sr-only\">(current)</span></a></li>\r\n                <li><a [routerLink]=\"['/addreader']\">Add Reader</a></li>\r\n            </ul>\r\n        </div><!-- /.navbar-collapse -->\r\n    </div><!-- /.container-fluid -->\r\n</nav>\r\n\r\n<router-outlet></router-outlet>\r\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _add_book_add_book_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./add-book/add-book.component */ "./src/app/add-book/add-book.component.ts");
/* harmony import */ var _add_reader_add_reader_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./add-reader/add-reader.component */ "./src/app/add-reader/add-reader.component.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var _edit_book_edit_book_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./edit-book/edit-book.component */ "./src/app/edit-book/edit-book.component.ts");
/* harmony import */ var _edit_reader_edit_reader_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./edit-reader/edit-reader.component */ "./src/app/edit-reader/edit-reader.component.ts");
/* harmony import */ var _core_core_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./core/core.module */ "./src/app/core/core.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
                _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_8__["DashboardComponent"],
                _add_book_add_book_component__WEBPACK_IMPORTED_MODULE_4__["AddBookComponent"],
                _edit_reader_edit_reader_component__WEBPACK_IMPORTED_MODULE_10__["EditReaderComponent"],
                _edit_book_edit_book_component__WEBPACK_IMPORTED_MODULE_9__["EditBookComponent"],
                _add_reader_add_reader_component__WEBPACK_IMPORTED_MODULE_5__["AddReaderComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_7__["AppRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _core_core_module__WEBPACK_IMPORTED_MODULE_11__["CoreModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/core/add-header.interceptor.ts":
/*!************************************************!*\
  !*** ./src/app/core/add-header.interceptor.ts ***!
  \************************************************/
/*! exports provided: AddHeaderInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddHeaderInterceptor", function() { return AddHeaderInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AddHeaderInterceptor = /** @class */ (function () {
    function AddHeaderInterceptor() {
    }
    AddHeaderInterceptor.prototype.intercept = function (req, next) {
        console.log("AddHeaderInterceptor - " + req.url);
        var jsonReq = req.clone({
            setHeaders: { 'Content-Type': 'application/json' }
        });
        return next.handle(req);
    };
    AddHeaderInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], AddHeaderInterceptor);
    return AddHeaderInterceptor;
}());



/***/ }),

/***/ "./src/app/core/book-tracker-error-handler.service.ts":
/*!************************************************************!*\
  !*** ./src/app/core/book-tracker-error-handler.service.ts ***!
  \************************************************************/
/*! exports provided: BookTrackerErrorHandlerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BookTrackerErrorHandlerService", function() { return BookTrackerErrorHandlerService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var app_models_bookTrackerError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/models/bookTrackerError */ "./src/app/models/bookTrackerError.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BookTrackerErrorHandlerService = /** @class */ (function () {
    function BookTrackerErrorHandlerService() {
    }
    BookTrackerErrorHandlerService.prototype.handleError = function (error) {
        var customError = new app_models_bookTrackerError__WEBPACK_IMPORTED_MODULE_1__["BookTrackerError"]();
        customError.errorNumber = 200;
        customError.message = error.message;
        customError.friendlyMessage = 'An error occurred. Please try again.';
        console.log(customError);
    };
    BookTrackerErrorHandlerService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], BookTrackerErrorHandlerService);
    return BookTrackerErrorHandlerService;
}());



/***/ }),

/***/ "./src/app/core/books-resolver.service.ts":
/*!************************************************!*\
  !*** ./src/app/core/books-resolver.service.ts ***!
  \************************************************/
/*! exports provided: BooksResolverService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BooksResolverService", function() { return BooksResolverService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data.service */ "./src/app/core/data.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var BooksResolverService = /** @class */ (function () {
    function BooksResolverService(dataService) {
        this.dataService = dataService;
    }
    BooksResolverService.prototype.resolve = function (route, state) {
        return this.dataService.getAllBooks()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(function (err) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(err); }));
    };
    BooksResolverService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_data_service__WEBPACK_IMPORTED_MODULE_3__["DataService"]])
    ], BooksResolverService);
    return BooksResolverService;
}());



/***/ }),

/***/ "./src/app/core/cache.interceptor.ts":
/*!*******************************************!*\
  !*** ./src/app/core/cache.interceptor.ts ***!
  \*******************************************/
/*! exports provided: CacheInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CacheInterceptor", function() { return CacheInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var app_services_http_cache_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/services/http-cache.service */ "./src/app/services/http-cache.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CacheInterceptor = /** @class */ (function () {
    function CacheInterceptor(cacheService) {
        this.cacheService = cacheService;
    }
    CacheInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        // pass along non-cacheable requests
        if (req.method !== 'GET') {
            console.log("Invalidating cache: " + req.method + " " + req.url);
            this.cacheService.invalidateCache();
            return next.handle(req);
        }
        // attempt to retrieve a cached response
        var cachedResponse = this.cacheService.get(req.url);
        // return cached response
        if (cachedResponse) {
            console.log("Returning a cached response: " + cachedResponse.url);
            console.log(cachedResponse);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(cachedResponse);
        }
        // send request to server and add response to cache
        return next.handle(req)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (event) {
            if (event instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpResponse"]) {
                console.log("Adding item to cache: " + req.url);
                _this.cacheService.put(req.url, event);
            }
        }));
    };
    CacheInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [app_services_http_cache_service__WEBPACK_IMPORTED_MODULE_4__["HttpCacheService"]])
    ], CacheInterceptor);
    return CacheInterceptor;
}());



/***/ }),

/***/ "./src/app/core/core.module.ts":
/*!*************************************!*\
  !*** ./src/app/core/core.module.ts ***!
  \*************************************/
/*! exports provided: CoreModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreModule", function() { return CoreModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _logger_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./logger.service */ "./src/app/core/logger.service.ts");
/* harmony import */ var _data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./data.service */ "./src/app/core/data.service.ts");
/* harmony import */ var app_core_module_import_guard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/module-import-guard */ "./src/app/core/module-import-guard.ts");
/* harmony import */ var _book_tracker_error_handler_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./book-tracker-error-handler.service */ "./src/app/core/book-tracker-error-handler.service.ts");
/* harmony import */ var _add_header_interceptor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./add-header.interceptor */ "./src/app/core/add-header.interceptor.ts");
/* harmony import */ var _log_response_interceptor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./log-response.interceptor */ "./src/app/core/log-response.interceptor.ts");
/* harmony import */ var _cache_interceptor__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./cache.interceptor */ "./src/app/core/cache.interceptor.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};










var CoreModule = /** @class */ (function () {
    function CoreModule(parentModule) {
        Object(app_core_module_import_guard__WEBPACK_IMPORTED_MODULE_5__["throwIfAlreadyLoaded"])(parentModule, 'CoreModule');
    }
    CoreModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]
            ],
            declarations: [],
            providers: [
                _logger_service__WEBPACK_IMPORTED_MODULE_3__["LoggerService"],
                _data_service__WEBPACK_IMPORTED_MODULE_4__["DataService"],
                { provide: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ErrorHandler"], useClass: _book_tracker_error_handler_service__WEBPACK_IMPORTED_MODULE_6__["BookTrackerErrorHandlerService"] },
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HTTP_INTERCEPTORS"], useClass: _add_header_interceptor__WEBPACK_IMPORTED_MODULE_7__["AddHeaderInterceptor"], multi: true },
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HTTP_INTERCEPTORS"], useClass: _log_response_interceptor__WEBPACK_IMPORTED_MODULE_8__["LogResponseInterceptor"], multi: true },
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HTTP_INTERCEPTORS"], useClass: _cache_interceptor__WEBPACK_IMPORTED_MODULE_9__["CacheInterceptor"], multi: true }
            ]
        }),
        __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"])()), __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["SkipSelf"])()),
        __metadata("design:paramtypes", [CoreModule])
    ], CoreModule);
    return CoreModule;
}());



/***/ }),

/***/ "./src/app/core/data.service.ts":
/*!**************************************!*\
  !*** ./src/app/core/data.service.ts ***!
  \**************************************/
/*! exports provided: DataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataService", function() { return DataService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var app_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/data */ "./src/app/data.ts");
/* harmony import */ var app_models__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/models */ "./src/app/models/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DataService = /** @class */ (function () {
    function DataService(http) {
        this.http = http;
        this.mostPopularBook = app_data__WEBPACK_IMPORTED_MODULE_4__["allBooks"][0];
    }
    DataService.prototype.setMostPopularBook = function (popularBook) {
        this.mostPopularBook = popularBook;
    };
    DataService.prototype.getAllReaders = function () {
        return app_data__WEBPACK_IMPORTED_MODULE_4__["allReaders"];
    };
    DataService.prototype.getReaderById = function (id) {
        return app_data__WEBPACK_IMPORTED_MODULE_4__["allReaders"].find(function (reader) { return reader.readerID === id; });
    };
    DataService.prototype.getAllBooks = function () {
        var _this = this;
        console.log('Getting all books from the server');
        return this.http.get('/api/books')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (err) { return _this.handleHttpError(err); }));
    };
    DataService.prototype.handleHttpError = function (error) {
        var dataError = new app_models__WEBPACK_IMPORTED_MODULE_5__["BookTrackerError"]();
        dataError.errorNumber = 100;
        dataError.message = error.statusText;
        dataError.friendlyMessage = 'An error occurred retrieving data.';
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(dataError);
    };
    DataService.prototype.getBookById = function (id) {
        return this.http.get("/api/books/" + id, {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Accept': 'application/json',
                'Authorization': 'my-token'
            })
        });
    };
    DataService.prototype.getOldBookById = function (id) {
        console.log('getoldbook');
        return this.http.get("/api/books/" + id)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (b) { return ({
            bookTitle: b.title,
            year: b.publicationYear
        }); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (classicBook) { return console.log(classicBook); }));
    };
    DataService.prototype.addBook = function (newBook) {
        return this.http.post('/api/books', newBook, {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json'
            })
        });
    };
    DataService.prototype.updateBook = function (updatedBook) {
        return this.http.put("/api/books/" + updatedBook.bookID, updatedBook, {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json'
            })
        });
    };
    DataService.prototype.deleteBook = function (bookID) {
        return this.http.delete("/api/books/" + bookID);
    };
    DataService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], DataService);
    return DataService;
}());



/***/ }),

/***/ "./src/app/core/log-response.interceptor.ts":
/*!**************************************************!*\
  !*** ./src/app/core/log-response.interceptor.ts ***!
  \**************************************************/
/*! exports provided: LogResponseInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogResponseInterceptor", function() { return LogResponseInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LogResponseInterceptor = /** @class */ (function () {
    function LogResponseInterceptor() {
    }
    LogResponseInterceptor.prototype.intercept = function (req, next) {
        console.log("LogResponseInterceptor - " + req.url);
        return next.handle(req)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(function (event) {
            if (event.type === _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpEventType"].Response) {
                console.log('event.body=', event.body);
            }
        }));
    };
    LogResponseInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], LogResponseInterceptor);
    return LogResponseInterceptor;
}());



/***/ }),

/***/ "./src/app/core/logger.service.ts":
/*!****************************************!*\
  !*** ./src/app/core/logger.service.ts ***!
  \****************************************/
/*! exports provided: LoggerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoggerService", function() { return LoggerService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var LoggerService = /** @class */ (function () {
    function LoggerService() {
    }
    LoggerService.prototype.log = function (message) {
        var timeString = new Date().toLocaleTimeString();
        console.log(message + " (" + timeString + ")");
    };
    LoggerService.prototype.error = function (message) {
        console.error("ERROR: " + message);
    };
    LoggerService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], LoggerService);
    return LoggerService;
}());



/***/ }),

/***/ "./src/app/core/module-import-guard.ts":
/*!*********************************************!*\
  !*** ./src/app/core/module-import-guard.ts ***!
  \*********************************************/
/*! exports provided: throwIfAlreadyLoaded */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "throwIfAlreadyLoaded", function() { return throwIfAlreadyLoaded; });
function throwIfAlreadyLoaded(parentModule, moduleName) {
    if (parentModule) {
        throw new Error(moduleName + " has already been loaded. Import Core modules in the AppModule only.");
    }
}


/***/ }),

/***/ "./src/app/dashboard/dashboard.component.html":
/*!****************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <div class=\"row\">\r\n    <div class=\"col-lg-4\">\r\n      <div class=\"panel panel-primary\">\r\n        <div class=\"panel-heading\">\r\n          <h3 class=\"panel-title\">All Books</h3>\r\n        </div>\r\n        <div class=\"panel-body\">\r\n        <li *ngFor='let book of allBooks'>\r\n          <i>{{book.title}}</i>\r\n          <a [routerLink]=\"['/editbook', book.bookID]\"> Edit </a>\r\n          <a (click)=\"deleteBook(book.bookID)\">Delete</a>\r\n        </li>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col-lg-4\">\r\n      <div class=\"panel panel-primary\">\r\n        <div class=\"panel-heading\">\r\n          <h3 class=\"panel-title\">All Readers</h3>\r\n        </div>\r\n        <div class=\"panel-body\">\r\n        <li *ngFor='let reader of allReaders'>\r\n          {{reader.name}}\r\n          <a [routerLink]=\"['/editreader', reader.readerID]\">Edit</a>\r\n          <a (click)=\"deleteReader(reader.readerID)\"> Delete </a>\r\n        </li>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col-lg-4\">\r\n      <div class=\"panel panel-primary\">\r\n        <div class=\"panel-heading\">\r\n          <h3 class=\"panel-title\">Most Popular Book</h3>\r\n        </div>\r\n        <div class=\"panel-body\">\r\n          <i>{{mostPopularBook.title}}</i> by {{mostPopularBook.author}}\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.ts":
/*!**************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.ts ***!
  \**************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var app_core_data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/data.service */ "./src/app/core/data.service.ts");
/* harmony import */ var _models_bookTrackerError__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../models/bookTrackerError */ "./src/app/models/bookTrackerError.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(dataService, title, route) {
        this.dataService = dataService;
        this.title = title;
        this.route = route;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        // this.dataService.getAllBooks()
        //   .subscribe(
        //     (data: Book[]) => this.allBooks = data,
        //     (err: BookTrackerError) => console.log(err.friendlyMessage),
        //     () => console.log('All done getting books.')
        //   );
        var resolvedData = this.route.snapshot.data['resolvedBooks'];
        if (resolvedData instanceof _models_bookTrackerError__WEBPACK_IMPORTED_MODULE_3__["BookTrackerError"]) {
            console.log("Dashboard component error: " + resolvedData.friendlyMessage);
        }
        else {
            this.allBooks = resolvedData;
        }
        this.allReaders = this.dataService.getAllReaders();
        this.mostPopularBook = this.dataService.mostPopularBook;
        this.title.setTitle("Book Tracker");
    };
    DashboardComponent.prototype.deleteBook = function (bookID) {
        var _this = this;
        this.dataService.deleteBook(bookID)
            .subscribe(function (data) {
            var index = _this.allBooks.findIndex(function (book) { return book.bookID === bookID; });
            _this.allBooks.splice(index, 1);
        }, function (err) { return console.log(err); });
    };
    DashboardComponent.prototype.deleteReader = function (readerID) {
        console.warn("Delete reader not yet implemented (readerID: " + readerID + ").");
    };
    DashboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(/*! ./dashboard.component.html */ "./src/app/dashboard/dashboard.component.html"),
            styles: []
        }),
        __metadata("design:paramtypes", [app_core_data_service__WEBPACK_IMPORTED_MODULE_2__["DataService"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["Title"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/data.ts":
/*!*************************!*\
  !*** ./src/app/data.ts ***!
  \*************************/
/*! exports provided: allReaders, allBooks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "allReaders", function() { return allReaders; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "allBooks", function() { return allBooks; });
var allReaders = [
    { readerID: 1, name: 'Marie', weeklyReadingGoal: 400, totalMinutesRead: 5600 },
    { readerID: 2, name: 'Daniel', weeklyReadingGoal: 210, totalMinutesRead: 3000 },
    { readerID: 3, name: 'Lanier', weeklyReadingGoal: 140, totalMinutesRead: 600 }
];
var allBooks = [
    { bookID: 1, title: 'Goodnight Moon', author: 'Margaret Wise Brown', publicationYear: 1953 },
    { bookID: 2, title: 'Winnie-the-Pooh', author: 'A. A. Milne', publicationYear: 1926 },
    { bookID: 3, title: 'Where the Wild Things Are', author: 'Maurice Sendak', publicationYear: 1963 },
    { bookID: 4, title: 'The Hobbit', author: 'J. R. R. Tolkien', publicationYear: 1937 },
    { bookID: 5, title: 'Curious George', author: 'H. A. Rey', publicationYear: 1941 },
    { bookID: 6, title: 'Alice\'s Adventures in Wonderland', author: 'Lewis Carroll', publicationYear: 1865 },
];


/***/ }),

/***/ "./src/app/edit-book/edit-book.component.html":
/*!****************************************************!*\
  !*** ./src/app/edit-book/edit-book.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"col-lg-5\">\r\n  <div class=\"well bs-component\">\r\n    <form class=\"form-horizontal\">\r\n      <fieldset>\r\n        <legend>Edit Book</legend>\r\n        <div class=\"form-group\">\r\n          <label for=\"inputTitle\" class=\"col-lg-3 control-label\">Title</label>\r\n          <div class=\"col-lg-8\">\r\n            <input type=\"text\" class=\"form-control\" id=\"inputTitle\" placeholder=\"Title\" [(ngModel)]=\"selectedBook && selectedBook.title\" name=\"title\">\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <label for=\"inputAuthor\" class=\"col-lg-3 control-label\">Author</label>\r\n          <div class=\"col-lg-8\">\r\n            <input type=\"text\" class=\"form-control\" id=\"inputAuthor\" placeholder=\"Author\" [(ngModel)]=\"selectedBook && selectedBook.author\" name=\"author\">\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <label for=\"inputYear\" class=\"col-lg-3 control-label\">Year</label>\r\n          <div class=\"col-lg-8\">\r\n            <input type=\"text\" class=\"form-control\" id=\"inputYear\" placeholder=\"Year Published\" [(ngModel)]=\"selectedBook && selectedBook.publicationYear\" name=\"publicationYear\">\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <div class=\"col-lg-8 col-lg-offset-3\">\r\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"saveChanges()\">Save</button>\r\n            <button type=\"button\" class=\"btn btn-success\" (click)=\"setMostPopular()\">Set As Most Popular</button>\r\n          </div>\r\n        </div>\r\n      </fieldset>\r\n    </form>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/edit-book/edit-book.component.ts":
/*!**************************************************!*\
  !*** ./src/app/edit-book/edit-book.component.ts ***!
  \**************************************************/
/*! exports provided: EditBookComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditBookComponent", function() { return EditBookComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_core_data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/data.service */ "./src/app/core/data.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EditBookComponent = /** @class */ (function () {
    function EditBookComponent(route, dataService) {
        this.route = route;
        this.dataService = dataService;
    }
    EditBookComponent.prototype.ngOnInit = function () {
        var _this = this;
        var bookID = parseInt(this.route.snapshot.params['id']);
        this.dataService.getBookById(bookID)
            .subscribe(function (data) { return _this.selectedBook = data; }, function (err) { return console.log(err); });
        this.dataService.getOldBookById(bookID)
            .subscribe(function (data) { return console.log("Old book title: " + data.bookTitle); });
    };
    EditBookComponent.prototype.setMostPopular = function () {
        this.dataService.setMostPopularBook(this.selectedBook);
    };
    EditBookComponent.prototype.saveChanges = function () {
        var _this = this;
        this.dataService.updateBook(this.selectedBook)
            .subscribe(function (data) { return console.log(_this.selectedBook.title + " updated successfully."); }, function (err) { return console.log(err); });
    };
    EditBookComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-edit-book',
            template: __webpack_require__(/*! ./edit-book.component.html */ "./src/app/edit-book/edit-book.component.html"),
            styles: []
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            app_core_data_service__WEBPACK_IMPORTED_MODULE_2__["DataService"]])
    ], EditBookComponent);
    return EditBookComponent;
}());



/***/ }),

/***/ "./src/app/edit-reader/edit-reader.component.html":
/*!********************************************************!*\
  !*** ./src/app/edit-reader/edit-reader.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"col-lg-5\">\r\n  <div class=\"well bs-component\">\r\n    <form class=\"form-horizontal\">\r\n      <fieldset>\r\n        <legend>Edit Reader</legend>\r\n        <div class=\"form-group\">\r\n          <label for=\"inputGoal\" class=\"col-lg-3 control-label\">Name</label>\r\n          <div class=\"col-lg-8\">\r\n            <input type=\"text\" class=\"form-control\" id=\"inputGoal\" placeholder=\"Name\" [(ngModel)]=\"selectedReader && selectedReader.name\" name=\"name\">\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <label for=\"inputGoal\" class=\"col-lg-3 control-label\">Weekly Goal</label>\r\n          <div class=\"col-lg-8\">\r\n            <input type=\"text\" class=\"form-control\" id=\"inputGoal\" placeholder=\"Weekly Goal\" [(ngModel)]=\"selectedReader && selectedReader.weeklyReadingGoal\" name=\"weeklyReaddingGoal\">\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <label for=\"inputTotal\" class=\"col-lg-3 control-label\">Total Read</label>\r\n          <div class=\"col-lg-8\">\r\n            <input type=\"text\" class=\"form-control\" id=\"inputTotal\" placeholder=\"Total Minutes Read\" [(ngModel)]=\"selectedReader && selectedReader.totalMinutesRead\" name=\"totalMinutesRead\">\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"form-group\">\r\n          <label for=\"inputTotal\" class=\"col-lg-3 control-label\">Current Badge</label>\r\n          <div class=\"col-lg-8\">\r\n            {{ currentBadge }}\r\n          </div>\r\n        </div>\r\n\r\n\r\n        <div class=\"form-group\">\r\n          <div class=\"col-lg-10 col-lg-offset-3\">\r\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"saveChanges()\">Save</button>\r\n          </div>\r\n        </div>\r\n      </fieldset>\r\n    </form>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/edit-reader/edit-reader.component.ts":
/*!******************************************************!*\
  !*** ./src/app/edit-reader/edit-reader.component.ts ***!
  \******************************************************/
/*! exports provided: EditReaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditReaderComponent", function() { return EditReaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_core_data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/data.service */ "./src/app/core/data.service.ts");
/* harmony import */ var app_services_badge_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/services/badge.service */ "./src/app/services/badge.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EditReaderComponent = /** @class */ (function () {
    function EditReaderComponent(route, dataService, badgeService) {
        this.route = route;
        this.dataService = dataService;
        this.badgeService = badgeService;
    }
    EditReaderComponent.prototype.ngOnInit = function () {
        var readerID = parseInt(this.route.snapshot.params['id']);
        this.selectedReader = this.dataService.getReaderById(readerID);
        this.currentBadge = this.badgeService.getReaderBadge(this.selectedReader.totalMinutesRead);
    };
    EditReaderComponent.prototype.saveChanges = function () {
        console.warn('Save reader not yet implemented.');
    };
    EditReaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-edit-reader',
            template: __webpack_require__(/*! ./edit-reader.component.html */ "./src/app/edit-reader/edit-reader.component.html"),
            styles: [],
            providers: [app_services_badge_service__WEBPACK_IMPORTED_MODULE_3__["BadgeService"]]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            app_core_data_service__WEBPACK_IMPORTED_MODULE_2__["DataService"],
            app_services_badge_service__WEBPACK_IMPORTED_MODULE_3__["BadgeService"]])
    ], EditReaderComponent);
    return EditReaderComponent;
}());



/***/ }),

/***/ "./src/app/models/book.ts":
/*!********************************!*\
  !*** ./src/app/models/book.ts ***!
  \********************************/
/*! exports provided: Book */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Book", function() { return Book; });
var Book = /** @class */ (function () {
    function Book() {
    }
    return Book;
}());



/***/ }),

/***/ "./src/app/models/bookTrackerError.ts":
/*!********************************************!*\
  !*** ./src/app/models/bookTrackerError.ts ***!
  \********************************************/
/*! exports provided: BookTrackerError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BookTrackerError", function() { return BookTrackerError; });
var BookTrackerError = /** @class */ (function () {
    function BookTrackerError() {
    }
    return BookTrackerError;
}());



/***/ }),

/***/ "./src/app/models/index.ts":
/*!*********************************!*\
  !*** ./src/app/models/index.ts ***!
  \*********************************/
/*! exports provided: BookTrackerError, Book, OldBook, Reader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _book__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./book */ "./src/app/models/book.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Book", function() { return _book__WEBPACK_IMPORTED_MODULE_0__["Book"]; });

/* harmony import */ var _oldBook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./oldBook */ "./src/app/models/oldBook.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OldBook", function() { return _oldBook__WEBPACK_IMPORTED_MODULE_1__["OldBook"]; });

/* harmony import */ var _bookTrackerError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bookTrackerError */ "./src/app/models/bookTrackerError.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BookTrackerError", function() { return _bookTrackerError__WEBPACK_IMPORTED_MODULE_2__["BookTrackerError"]; });

/* harmony import */ var _reader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./reader */ "./src/app/models/reader.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Reader", function() { return _reader__WEBPACK_IMPORTED_MODULE_3__["Reader"]; });







/***/ }),

/***/ "./src/app/models/oldBook.ts":
/*!***********************************!*\
  !*** ./src/app/models/oldBook.ts ***!
  \***********************************/
/*! exports provided: OldBook */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OldBook", function() { return OldBook; });
var OldBook = /** @class */ (function () {
    function OldBook() {
    }
    return OldBook;
}());



/***/ }),

/***/ "./src/app/models/reader.ts":
/*!**********************************!*\
  !*** ./src/app/models/reader.ts ***!
  \**********************************/
/*! exports provided: Reader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Reader", function() { return Reader; });
var Reader = /** @class */ (function () {
    function Reader() {
    }
    return Reader;
}());



/***/ }),

/***/ "./src/app/services/badge.service.ts":
/*!*******************************************!*\
  !*** ./src/app/services/badge.service.ts ***!
  \*******************************************/
/*! exports provided: BadgeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BadgeService", function() { return BadgeService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BadgeService = /** @class */ (function () {
    function BadgeService() {
    }
    BadgeService.prototype.getReaderBadge = function (minutesRead) {
        if (minutesRead > 5000) {
            return 'Book Worm';
        }
        else if (minutesRead > 2500) {
            return 'Page Turner';
        }
        else {
            return 'Getting Started';
        }
    };
    BadgeService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], BadgeService);
    return BadgeService;
}());



/***/ }),

/***/ "./src/app/services/http-cache.service.ts":
/*!************************************************!*\
  !*** ./src/app/services/http-cache.service.ts ***!
  \************************************************/
/*! exports provided: HttpCacheService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpCacheService", function() { return HttpCacheService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HttpCacheService = /** @class */ (function () {
    function HttpCacheService() {
        this.requests = {};
    }
    HttpCacheService.prototype.put = function (url, response) {
        this.requests[url] = response;
    };
    HttpCacheService.prototype.get = function (url) {
        return this.requests[url];
    };
    HttpCacheService.prototype.invalidateUrl = function (url) {
        this.requests[url] = undefined;
    };
    HttpCacheService.prototype.invalidateCache = function () {
        this.requests = {};
    };
    HttpCacheService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], HttpCacheService);
    return HttpCacheService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"]);


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/WilliamHuang/Developer/project/angular/Angular_HTTP_Communication/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map