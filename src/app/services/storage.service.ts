/* tslint:disable*/
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/share';

// export class StorageService {
//     public _get(): Storage;
// }

@Injectable()
export class LocalStorageService  {
    public get(): Storage {
        return localStorage;
    }
}
