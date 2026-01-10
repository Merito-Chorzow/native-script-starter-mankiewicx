import {
  Component,
  OnInit,
  NO_ERRORS_SCHEMA,
  NgZone,
  ChangeDetectorRef,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  NativeScriptCommonModule,
  RouterExtensions,
  NativeScriptFormsModule,
} from "@nativescript/angular";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/product.model";
import { confirm } from "@nativescript/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "ns-product-detail",
  templateUrl: "./product-detail.component.html",
  standalone: true,
  imports: [NativeScriptCommonModule, NativeScriptFormsModule, CommonModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private srv: ProductService,
    private router: RouterExtensions,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;

    this.zone.runOutsideAngular(() => {
      this.srv.getById(id).subscribe({
        next: (res) => {
          this.zone.run(() => {
            this.product = res;
            this.cdr.markForCheck();
          });
        },
        error: () => {
          this.zone.run(() => {
            alert("Nie znaleziono produktu.");
            this.router.back();
          });
        },
      });
    });
  }

  goBack() {
    this.router.back();
  }

  editProduct() {
    console.log(">>> START NAWIGACJI DO EDYCJI ID:", this.product?.id);

    this.zone.run(() => {
      this.router
        .navigate(["/product-edit", this.product.id], {
          animated: true,
          transition: { name: "slide", duration: 250 },
        })
        .then((result) => {
          console.log(">>> CZY NAWIGACJA ZAKOŃCZONA SUKCESEM?", result);
        })
        .catch((error) => {
          console.error(">>> KRYTYCZNY BŁĄD NAWIGACJI:", error);
        });
    });
  }

  deleteProduct() {
    if (!this.product?.id) return;

    confirm({
      title: "Usuwanie produktu",
      message: `Czy na pewno chcesz usunąć "${this.product.name}"?`,
      okButtonText: "Usuń",
      cancelButtonText: "Anuluj",
    }).then((result) => {
      if (result) {
        this.zone.runOutsideAngular(() => {
          this.srv.delete(this.product!.id!).subscribe({
            next: () => {
              this.zone.run(() => {
                alert("Produkt został usunięty.");
                this.router.navigate(["/products"], { clearHistory: true });
              });
            },
          });
        });
      }
    });
  }
}
