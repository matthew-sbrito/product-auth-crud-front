import { Component } from '@angular/core';
import {MatPaginatorIntl} from "@angular/material/paginator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'techsolutio-front';

  constructor(private paginator: MatPaginatorIntl) {
    paginator.firstPageLabel = "Primeira página";
    paginator.lastPageLabel = "Última página";
    paginator.nextPageLabel = "Próxima página";
    paginator.previousPageLabel = "Página anterior";
    paginator.getRangeLabel = (page, pageSize, length) => {
      const totalPages = Math.round(length / pageSize);

      return `Página ${page + 1} de ${totalPages} - ${length} items`;
    }

    paginator.itemsPerPageLabel = "Items por página: "
  }

}
