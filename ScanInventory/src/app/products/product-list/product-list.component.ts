import {
  Component,
  OnInit,
  NgZone,
  ChangeDetectorRef,
  NO_ERRORS_SCHEMA,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  NativeScriptCommonModule,
  RouterExtensions,
} from "@nativescript/angular";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/product.model";

@Component({
  selector: "ns-product-list",
  templateUrl: "./product-list.component.html",
  standalone: true,
  imports: [NativeScriptCommonModule, CommonModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = false;
  error: string = "";

  constructor(
    private srv: ProductService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.error = "";

    this.srv.getAll().subscribe({
      next: (res) => {
        this.zone.run(() => {
          console.log("SUKCES! Pobrano danych:", res.length);
          this.products = res;
          this.loading = false;
          this.cdr.markForCheck();
        });
      },
      error: (err) => {
        this.zone.run(() => {
          console.error("Błąd HTTP:", err.message);
          this.error = "Nie udało się pobrać listy.";
          this.loading = false;
          this.cdr.markForCheck();
        });
      },
    });
  }

  onItemTap(args: any) {
    const item = this.products[args.index];
    this.routerExtensions.navigate(["/product", item.id], {
      transition: { name: "slide", duration: 200 },
    });
  }

  onAdd() {
    this.routerExtensions.navigate(["/product-add"]);
  }
}
