import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from "@angular/router";
import {TableDataSource} from "../../../shared/common/table.model";
import {LoadingService} from "../../../shared/services/loading.service";
import {Product} from "../../../shared/models/product.model";
import {Confirmable} from "../../../shared/common/confirmable/confimable.decorator";
import {ProductService} from "../../../shared/services/product.service";
import {MatDialog} from "@angular/material/dialog";
import {ProductDialogComponent, ProductDialogParams} from "../product-dialog/product-dialog.component";
import {filter} from "rxjs";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-product-read',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'provider', 'action'];

  dataSource: TableDataSource<Product> = {
    pageable: {
      pageNumber: 0,
      pageSize: 10,
    }
  } as TableDataSource<Product>;

  constructor(
    private loading: LoadingService,
    private toastr: ToastrService,
    private router: Router,
    private productService: ProductService,
    private matDialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.handleProducts();
  }

  handleProducts(): void {
    const loadingRef = this.loading.show();

    this.productService
      .find(this.dataSource.pageable)
      .subscribe({
        next: (response) => this.dataSource = response,
        error: () =>
          this.toastr.error('Erro ao carregar lista de produtos!'),
      }).add(() => loadingRef.close())
  }

  @Confirmable({
    title: "Excluir",
    message: "Deseja realmente excluir o produto?"
  })
  destroy(product: Product): void {
    const loadingRef = this.loading.show();
    this.productService
      .destroy(product)
      .subscribe({
        next: () => {
          this.toastr.success('Produto deletado com sucesso!');
          this.handleProducts();
        },
        error: () =>
          this.toastr.error('Erro ao carregar lista de produtos!'),
      })
      .add(() => loadingRef.close());
  }

  dialogEdit(product: Product): void {
    this.openDialog({product: Product.fromApi(product), modeEdit: true})
  }

  dialogNew(): void {
    this.openDialog({product: Product.empty(), modeEdit: false})
  }

  openDialog(data: ProductDialogParams): void {
    const dialogRef = this.matDialog.open<ProductDialogComponent, ProductDialogParams, Product | null>(ProductDialogComponent, {
      data
    })

    dialogRef.afterClosed()
      .pipe(filter(e => e != null))
      .subscribe({
        next: (product) => this.save(product!, data.modeEdit)
      })
  }

  save(product: Product, modeEdit: boolean): void {
    const service = modeEdit ? this.productService.update(product) : this.productService.create(product);

    service.subscribe({
      next: (value) => {
        const message = modeEdit ? "atualizado" : "salvo";
        this.toastr.success(`Produto ${message} com sucesso!`, "Sucesso!")
        this.reset();
      },
      error: () => {
        this.toastr.error(`Error ao tentar salvar produto!`, "Oppss!")
      }
    })
  }

  reset() {
    this.dataSource.pageable.pageNumber = 0;

    this.handleProducts();
  }

  onPageChange(page: PageEvent) {
    this.dataSource.pageable.pageSize = page.pageSize;
    this.dataSource.pageable.pageNumber = page.pageIndex;

    this.handleProducts();
  }
}
