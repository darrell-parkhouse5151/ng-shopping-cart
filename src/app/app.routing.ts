/* tslint:disable*/
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderConmfirmationComponent } from './order-conmfirmation/order-conmfirmation.component';
import { StoreFrontComponent } from './store-front/store-front.component';
import { PopulatedCardRouteGuard } from './guard/populated-cart.route-guard';

@NgModule({
    exports: [ RouterModule ],
    imports: [
        RouterModule.forRoot([
            {
                canActivate: [PopulatedCardRouteGuard],
                path: 'checkout',
                component: CheckoutComponent,
            },
            {
                canActivate: [PopulatedCardRouteGuard],
                path: 'confirmed',
                component: OrderConmfirmationComponent
            },
            {
                path: '**',
                component: StoreFrontComponent
            }

        ])
    ]
})
export class AppRoutingModule {}
