/* tslint:disable*/
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Product } from '../models/product.odel';
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { CachingServiceBase } from './caching.service';

let count = 0;

@Injectable()
export class ProductDataService extends CachingServiceBase {
    private products: Observable<Product[]>;

    public constructor(private http: Http) {
        super();
    }

    public all(): Observable<Product[]> {
        return this.cache<Product[]>(
            () => this.products,
            (val: Observable<Product[]>) => this.products = val,
            () => this.http
                .get('./assets/products.json')
                .map((response) => response.json()
                    .map((item) => {
                        let model = new Product();
                        model.updateFrom(item);
                        return model;
                    }))
        )
    }
}
