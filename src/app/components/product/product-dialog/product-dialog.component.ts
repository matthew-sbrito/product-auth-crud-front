import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../../../shared/models/product.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private matDialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: ProductDialogParams,
    private fb: FormBuilder,
    private toast: ToastrService
  ) {
    this.formGroup = this.fb.group({
        name: [this.data.product.name, [Validators.required, Validators.minLength(4)]],
        price: [this.data.product.price, [Validators.required, Validators.min(1)]],
        provider: [this.data.product.provider, [Validators.required, Validators.minLength(4)]],
      }
    )
  }

  ngOnInit(): void { }

  get modeEdit(): boolean {
    return this.data.modeEdit;
  }

  get title(): string {
    return this.modeEdit ? `Editar produto #${this.data.product.id}` : "Cadastrar produto";
  }

  get labelButton(): string {
    return this.modeEdit ? "Salvar" : "Cadastrar";
  }

  save() {
    if(!this.formGroup.valid) {
      this.toast.error("Preencha os campos corretamente!", "Oppss!");
      return;
    }

    this.data.product = { id: this.data.product.id, ...this.formGroup.value }

    this.matDialogRef.close(this.data.product)
  }

  cancel() {
    this.matDialogRef.close();
  }
}

export interface ProductDialogParams {
  modeEdit: boolean;
  product: Product;
}
