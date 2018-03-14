/* tslint:disable*/
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { DeliveryOption } from '../models/delivery-option.model';
import { Product } from '../models/product.odel';
import { ShoppingCart } from '../models/shopping-cart.model';
import { DeliveryOptionDataService } from '../services/delivery-options.service';
import { ProductDataService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

interface ICartItemWitheProduct extends CartItem {
    product: Product;
    totalCost: number;
}
@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
    public deliveryOptions: Observable<DeliveryOption[]>;
    public cart: Observable<ShoppingCart>;
    public cartItems: ICartItemWitheProduct[];
    public itemCount: number;

    public products: Product[];
    private cartSubscription: Subscription;

    constructor(private productService: ProductDataService,
                private deliveryOptionService: DeliveryOptionDataService,
                private shoppingCartService: ShoppingCartService) {
    }

    public emptyCart(): void {
        this.shoppingCartService.empty();
    }

    public setDeliveryOption(option: DeliveryOption): void {
        this.shoppingCartService.setDeliveryOption(option);
    }
    ngOnInit(): void {
        this.deliveryOptions = this.deliveryOptionService.all();
        this.cartSubscription = this.cart.subscribe((cart) => {
            this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
            this.productService.all().subscribe((products) => {
                this.products = products;
                this.cartItems = cart.items
                    .map((item) => {
                        const product = this.products.find((p) => p.id === item.productId);
                        return {
                            ...item,
                            product,
                            totalCost: product.price * item.quantity
                        };
                    });
            });
        });
    }

    public ngOnDestroy(): void {
        if (this.cartSubscription) {
            this.cartSubscription.unsubscribe();
        }
    }
}
