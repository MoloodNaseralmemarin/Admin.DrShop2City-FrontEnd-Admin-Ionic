import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseResult } from '../DTOs/Common/IResponseResult';
import { ProductCategory } from '../DTOs/Products/ProductCategory';
import { FilterProductsViewModel } from '../DTOs/Products/FilterProductsViewModel';
import { ProductDetailViewModel } from './../DTOs/Products/ProductDetailViewModel';
import { Product } from '../DTOs/Products/Product';
import { ProductCommentViewModel } from '../DTOs/Products/ProductCommentViewModel';
import { AddProductComment } from './../DTOs/Products/AddProductComment';
import { EditProductViewModel } from '../DTOs/Products/EditProductViewModel';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(
    private http: HttpClient
  ) {
  }

  getFilteredProducts(filter: FilterProductsViewModel): Observable<IResponseResult<FilterProductsViewModel>> {
    let params = new HttpParams();
    if (filter !== null) {
      params = new HttpParams()
        .set('pageId', filter.pageId.toString())
        .set('title', filter.title)
        .set('startPrice', filter.startPrice.toString())
        .set('endPrice', filter.endPrice.toString())
        .set('takeEntity', filter.takeEntity.toString());
      for (const category of filter.categories) {
        params = params.append('categories', category.toString());
      }
    }
    return this.http.get<IResponseResult<FilterProductsViewModel>>('/products/filter-products', { params });
  }

  getProductActiveCategories(): Observable<IResponseResult<ProductCategory[]>> {
    return this.http.get<IResponseResult<ProductCategory[]>>('/products/product-active-categories');
  }

  getSingleProduct(productId: number): Observable<IResponseResult<ProductDetailViewModel>> {
    return this.http.get<IResponseResult<ProductDetailViewModel>>('/products/single-product/' + productId);
  }

  getRelatedProducts(productId: number): Observable<IResponseResult<Product[]>> {
    return this.http.get<IResponseResult<Product[]>>('/products/related-products/' + productId);
  }
  getProductComments(productId: number): Observable<IResponseResult<ProductCommentViewModel[]>> {
    return this.http.get<IResponseResult<ProductCommentViewModel[]>>('/products/product-comments/' + productId);
  }
  addProductComment(comment: AddProductComment): Observable<IResponseResult<ProductCommentViewModel>> {
    return this.http.post<IResponseResult<ProductCommentViewModel>>('/products/add-product-comment', comment);
  }

  getProductById(productId: number): Observable<IResponseResult<Product>> {
    return this.http.get<IResponseResult<Product>>('/products/get-product-by-id/' + productId);
  }

  getProductForEdit(productId: number): Observable<IResponseResult<EditProductViewModel>> {
    return this.http.get<IResponseResult<EditProductViewModel>>('/AdminProducts/get-product-for-edit/' + productId);
  }

  editProduct(product: EditProductViewModel): Observable<IResponseResult<any>> {
    return this.http.post<IResponseResult<any>>('/AdminProducts/edit-product', product);
}
}
