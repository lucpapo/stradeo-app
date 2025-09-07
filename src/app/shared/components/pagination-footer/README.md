# PaginationFooterComponent

Componente reutilizável para exibir paginação com seletor de tamanho de página.

## Uso

```html
<app-pagination-footer
  [currentPage]="currentPage"
  [pageSize]="pageSize"
  [total]="total"
  [showingRange]="showingRange"
  [pageSizeOptions]="[5, 10, 25, 50, 100]"
  (pageChange)="onPageChange($event)"
  (pageSizeChange)="onPageSizeChange($event)">
</app-pagination-footer>
```

## Propriedades de Entrada (@Input)

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `currentPage` | `number` | `1` | Página atual |
| `pageSize` | `number` | `10` | Número de itens por página |
| `total` | `number` | `0` | Total de registros |
| `showingRange` | `string` | `''` | Texto mostrando o range de itens (ex: "Mostrando 1 a 10 de 100 registros") |
| `pageSizeOptions` | `number[]` | `[5, 10, 25, 50, 100]` | Opções disponíveis para tamanho da página |

## Eventos de Saída (@Output)

| Evento | Tipo | Descrição |
|--------|------|-----------|
| `pageChange` | `EventEmitter<number>` | Emitido quando a página é alterada |
| `pageSizeChange` | `EventEmitter<number>` | Emitido quando o tamanho da página é alterado |

## Exemplo Completo

```typescript
export class ExampleListComponent {
  currentPage = 1;
  pageSize = 10;
  total = 0;
  data: any[] = [];

  get showingRange(): string {
    if (this.total === 0) return 'Nenhum registro encontrado';
    
    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(this.currentPage * this.pageSize, this.total);
    return `Mostrando ${start} a ${end} de ${this.total} registros`;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadData();
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.currentPage = 1; // Reset para primeira página
    this.loadData();
  }

  private loadData(): void {
    // Implementar lógica de carregamento de dados
  }
}
```

## Importação

```typescript
import { PaginationFooterComponent } from '@pcodeshared/components/pagination-footer/pagination-footer.component';

@Component({
  // ...
  imports: [PaginationFooterComponent],
  // ...
})
```