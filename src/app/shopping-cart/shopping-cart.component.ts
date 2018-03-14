/* tslint:disable*/
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ProductDataService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Observable } from 'rxjs/Observable';
import { Product } from '../models/product.odel';
import { ShoppingCart } from '../models/shopping-cart.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
    public products: Observable<Product[]>;
    public cart: Observable<ShoppingCart>;
    public itemCount: number;

    private cartSubscription: Subscription;

    constructor(private productService: ProductDataService,
                private shoppingCartService: ShoppingCartService) {
    }

    public emptyCart(): void {
        this.shoppingCartService.empty();
    }
    ngOnInit() {
        this.products = this.productService.all();
        this.cart = this.shoppingCartService.get();
        this.cartSubscription = this.cart.subscribe((cart) => {
            this.itemCount = cart.items.map((x) => x.quantity)
                .reduce((p, n) => p + n, 0);
        })
    }

    ngOnDestroy(): void {
        if (this.cartSubscription) {
            this.cartSubscription.unsubscribe();
        }
    }


}
