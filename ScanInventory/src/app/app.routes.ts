import { Routes } from "@angular/router";
import { ProductListComponent } from "./products/product-list/product-list.component";
import { ProductDetailComponent } from "./products/product-detail/product-detail.component";
import { ProductAddComponent } from "./products/product-add/product-add.component";

export const routes: Routes = [
  { path: "", redirectTo: "/products", pathMatch: "full" },
  { path: "products", component: ProductListComponent },
  { path: "product/:id", component: ProductDetailComponent },
  { path: "product-add", component: ProductAddComponent },
  { path: "product-edit/:id", component: ProductAddComponent },
];
