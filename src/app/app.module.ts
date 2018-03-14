/* tslint:disable*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CachingServiceBase } from './services/caching.service';
import { DeliveryOptionDataService } from './services/delivery-options.service';
import { ProductDataService } from './services/product.service';
import { LocalStorageService } from './services/storage.service';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [
        CachingServiceBase,
        DeliveryOptionDataService,
        ProductDataService,
        LocalStorageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
