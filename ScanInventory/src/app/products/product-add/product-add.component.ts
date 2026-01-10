import {
  Component,
  OnInit,
  NO_ERRORS_SCHEMA,
  NgZone,
  ChangeDetectorRef,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import {
  NativeScriptCommonModule,
  RouterExtensions,
  NativeScriptFormsModule,
} from "@nativescript/angular";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/product.model";
import { BarcodeScanner } from "nativescript-barcodescanner";
import * as camera from "@nativescript/camera";
import { CommonModule } from "@angular/common";

@Component({
  selector: "ns-product-add",
  templateUrl: "./product-add.component.html",
  standalone: true,
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    CommonModule,
    FormsModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ProductAddComponent implements OnInit {
  product: Product = {
    name: "",
    code: "",
    description: "",
    status: "Nowy",
    image: "",
  };
  isEditMode: boolean = false;
  private scanner: BarcodeScanner;
  isSaving: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private srv: ProductService,
    public router: RouterExtensions,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {
    this.scanner = new BarcodeScanner();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];
    console.log(">>> POBRANE ID W FORMULARZU:", id);

    if (id) {
      this.isEditMode = true;
      this.loadProduct(id);
    }
  }

  loadProduct(id: string) {
    this.zone.runOutsideAngular(() => {
      this.srv.getById(id).subscribe((res) => {
        this.zone.run(() => {
          this.product = res;
          this.cdr.markForCheck();
        });
      });
    });
  }

  onScan() {
    this.scanner
      .scan({
        formats: "QR_CODE, EAN_13, EAN_8",
        cancelLabel: "ZAMKNIJ",
        message: "Zeskanuj kod produktu",
        beepOnScan: true,
      })
      .then((result) => {
        this.zone.run(() => {
          this.product.code = result.text;
          this.cdr.markForCheck();
        });
      });
  }

  onTakePhoto() {
    camera.requestPermissions().then(() => {
      camera
        .takePicture({
          width: 300,
          height: 300,
          keepAspectRatio: true,
          saveToGallery: false,
        })
        .then((imageAsset) => {
          this.zone.run(() => {
            this.product.image = imageAsset.android || imageAsset.ios;
            this.cdr.markForCheck();
          });
        });
    });
  }

  isImageValid(): boolean {
    return !!(
      this.product &&
      this.product.image &&
      (this.product.image.startsWith("http") ||
        this.product.image.startsWith("/"))
    );
  }

  onSave() {
    this.isSaving = true;

    this.zone.runOutsideAngular(() => {
      const request =
        this.isEditMode && this.product.id
          ? this.srv.update(this.product.id, this.product)
          : this.srv.create(this.product);

      request.subscribe({
        next: () => {
          this.zone.run(() => {
            this.isSaving = false;
            alert(this.isEditMode ? "Zaktualizowano!" : "Dodano!");
            this.router.navigate(["/products"], { clearHistory: true });
          });
        },
        error: (err) => {
          this.zone.run(() => {
            this.isSaving = false;
            alert("Błąd: " + err.message);
          });
        },
      });
    });
  }
}
