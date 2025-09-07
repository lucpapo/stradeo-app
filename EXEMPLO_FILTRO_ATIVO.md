# Como Usar o Filtro Ativo na Tabela

## Problema Resolvido
Antes: A tabela sempre usava o `gerenciador` padrão, mesmo com filtros independentes.
Agora: A tabela usa o `gerenciadorAtivo` baseado no input `filtro`.

## Como Funciona

### 1. **Sem Input Filtro (Comportamento Padrão)**
```html
<div class="container-fluid">
  <!-- Tabela usa gerenciador padrão -->
</div>
```
**Resultado:** Tabela mostra "Filtro: Padrão (sem input filtro)"

### 2. **Com Input Filtro Específico**
```html
<div class="container-fluid"
     [filtro]="'TipocategoriaFilterPage#main'">
  <!-- Tabela usa gerenciador específico para essa chave -->
</div>
```
**Resultado:** Tabela mostra "Filtro: TipocategoriaFilterPage#main"

### 3. **Alternando Entre Filtros**
```html
<!-- Botões para alternar filtro ativo -->
<div class="mb-3">
  <button class="btn btn-sm btn-outline-primary me-2" 
          (click)="filtroAtivo = ''">
    Usar Filtro Padrão
  </button>
  <button class="btn btn-sm btn-outline-primary me-2" 
          (click)="filtroAtivo = 'TipocategoriaFilterPage#main'">
    Usar Filtro #main
  </button>
  <button class="btn btn-sm btn-outline-primary" 
          (click)="filtroAtivo = 'TipocategoriaFilterPage#main2'">
    Usar Filtro #main2
  </button>
</div>

<div class="container-fluid"
     [filtro]="filtroAtivo">
  <!-- Tabela muda dinamicamente baseado no filtroAtivo -->
</div>
```

## Implementação no Componente

### TypeScript (Opcional - para alternância dinâmica)
```typescript
export class TipocategoriaListPage extends BaseListaPage<...> {
  // Propriedade para controlar qual filtro usar
  filtroAtivo = 'TipocategoriaFilterPage#main';
  
  // Resto da implementação...
}
```

### Template
```html
<div class="container-fluid"
     [filtro]="filtroAtivo">
  
  <!-- Info sobre filtro ativo -->
  <div class="alert alert-info py-2 mb-3">
    <strong>Tabela Principal:</strong> {{ infoFiltroAtivo }}
  </div>
  
  <!-- Tabela usa gerenciadorAtivo automaticamente -->
  <div *ngIf="gerenciadorAtivo.loading()">Carregando...</div>
  
  <table>
    <tbody>
      <tr *ngFor="let r of gerenciadorAtivo.rows()">
        <!-- dados da tabela -->
      </tr>
    </tbody>
  </table>
  
  <!-- Paginação usa gerenciadorAtivo -->
  <div class="card-footer">
    <small>{{ gerenciadorAtivo.showingRange() }}</small>
    <button (click)="gerenciadorAtivo.prevPage()">Anterior</button>
    <button (click)="gerenciadorAtivo.nextPage()">Próxima</button>
  </div>
</div>
```

## Vantagens

✅ **Tabela Dinâmica**: Muda automaticamente baseado no input `filtro`
✅ **Informação Clara**: Mostra qual filtro está ativo
✅ **Isolamento Real**: Cada filtro tem seus próprios dados/paginação
✅ **Flexibilidade**: Pode alternar filtros dinamicamente
✅ **Compatibilidade**: Funciona com filtros existentes

## Exemplo Prático

**Cenário:** Você tem 3 filtros independentes e quer que a tabela mostre dados de um específico:

```html
<!-- Filtros independentes -->
<app-tipocategoria-filter [componentKey]="'Filter1'"></app-tipocategoria-filter>
<app-tipocategoria-filter [componentKey]="'Filter2'"></app-tipocategoria-filter>
<app-tipocategoria-filter [componentKey]="'Filter3'"></app-tipocategoria-filter>

<!-- Tabela mostra dados do Filter2 -->
<div [filtro]="'Filter2'">
  <table>
    <!-- Dados filtrados pelo Filter2 -->
  </table>
</div>
```

Agora a tabela é verdadeiramente independente e mostra exatamente qual filtro está considerando!