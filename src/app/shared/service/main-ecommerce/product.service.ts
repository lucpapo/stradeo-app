import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class ProductService {
    
    constructor(private http: HttpClient) { }
    products(): Observable<any> {   
        return this.http.get('assets/data/product.json').pipe(
            map((res) => {
                return res;
            })
        );
    }
    
}
