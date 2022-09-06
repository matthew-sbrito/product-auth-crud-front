import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../../../shared/models/product.model";

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {
  product!: Product;

  constructor(
    private matDialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: ProductDialogParams
  ) { }

  ngOnInit(): void {
    this.product = this.data.product
  }

  get modeEdit(): boolean {
    return this.data.modeEdit;
  }

  get title(): string {
    return this.modeEdit ? `Editar produto #${this.product.id}` : "Cadastrar produto";
  }

  get labelButton(): string {
    return this.modeEdit ? "Salvar" : "Cadastrar";
  }

  save() {
    this.matDialogRef.close(this.product)
  }

  cancel() {
    this.matDialogRef.close();
  }
}

export interface ProductDialogParams {
  modeEdit: boolean;
  product: Product;
}
