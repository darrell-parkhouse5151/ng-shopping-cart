/* tslint:disable*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CachingServiceBase } from './services/caching.service';
import { DeliveryOptionDataService } from './services/delivery-options.service';
import { ProductDataService } from './services/product.service';
import { LocalStorageService } from './services/storage.service';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { StoreFrontComponent } from './store-front/store-front.component';
import { AppRoutingModule } from './app.routing';
import { Local } from 'protractor/built/driverProviders';
import { ShoppingCartService } from './services/shopping-cart.service';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';


@NgModule({
    declarations: [
        AppComponent,
        ShoppingCartComponent,
        CheckoutComponent,
        StoreFrontComponent,
        OrderConfirmationComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [
        CachingServiceBase,
        DeliveryOptionDataService,
        ProductDataService,
        LocalStorageService,
        {provide: LocalStorageService, useClass: Local},
        {
            deps: [LocalStorageService, ProductDataService, DeliveryOptionDataService],
            provide: ShoppingCartService,
            useClass: ShoppingCartService
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
