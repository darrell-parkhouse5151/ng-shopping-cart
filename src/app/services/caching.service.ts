/* tslint:disable*/
import "rxjs/add/operator/share";
import { Observable } from 'rxjs/Observable';

export class CachingServiceBase {
    protected cache<T>(getter: () => Observable<T>,
                       setter: (val: Observable<T>) => void,
                       retrieve: () => Observable<T>): Observable<T> {
        const cached = getter();

        if (cached !== undefined) {
            return cached;
        } else {
            const val = retrieve().share();
            setter(val);
            return val;
        }
    }
}
