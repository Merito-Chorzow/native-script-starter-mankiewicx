import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product } from "../models/product.model";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class ProductService {
  private http = inject(HttpClient);
  private api = `${environment.apiUrl}/product`;

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.api}`);
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.api}/${id}`);
  }

  update(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.api}/${id}`, product);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.api, product);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
