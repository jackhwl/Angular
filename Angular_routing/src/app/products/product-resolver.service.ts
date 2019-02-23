import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { ProductResolved } from './product';
import { ProductService } from "./product.service";
import { catchError, map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ProductResolver implements Resolve<ProductResolved> {

    constructor(private productService: ProductService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved> {
        const id = route.paramMap.get('id');
        if (isNaN(+id)) {
            const message = `Product id was not a number: ${id}`;
            console.error(message);
            return of({product: null, error: message}); // 1.return false; 2.return null; 3. navigate to error page
        }
        return this.productService.getProduct(+id)
            .pipe(
                map(product => {
                    return ({ product: product });
                }),
                catchError(error => {
                    const message = `Retrieval error: ${error}`;
                    console.error(message);
                    return of({product: null, error: message});
                })
            );
    }

}