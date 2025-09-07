# Exemplo: TipoCategoria com Filtro do State

## Como Implementar

### 1. Atualizar o Template da Lista

**Arquivo:** `src/app/features/configuracoes/tipocategoria/crud/search/list/tipocategoria-list.page.html`

Adicionar os inputs no elemento raiz:

```html
<div class="container-fluid tipocategoria-list-page"
     [masterKey]="'ui-TipocategoriaShellComponent'"
     [componentKey]="'TipocategoriaListPage#main'"
     [filtro]="'TipocategoriaFilterPage#main'">

  <!-- O filtro continua igual -->
  <app-tipocategoria-filter 
    [value]="gerenciador.filterValue()" 
    [masterKey]="'ui-TipocategoriaShellComponent'"
    [componentKey]="'TipocategoriaFilterPage#main'" 
    (apply)="gerenciador.aplicarFiltro($event)"
    (clear)="gerenciador.limparFiltro()">
  </app-tipocategoria-filter>

  <!-- resto do template continua igual -->
</div>
```

### 2. Atualizar o Componente TypeScript

**Arquivo:** `src/app/features/configuracoes/tipocategoria/crud/search/list/tipocategoria-list.page.ts`

Não precisa alterar nada no TypeScript! O `BaseListaPage` já cuida de tudo.

### 3. Como Funciona

1. **Inicialização:**
   - Lista inicializa e verifica se existe filtro salvo no state com chave `TipocategoriaFilterPage#main`
   - Se existe: usa o filtro do state
   - Se não existe: usa o filtro inicial padrão (`{ descricao: '', status_delecao: '0' }`)

2. **Aplicação de Filtro:**
   - Usuário preenche filtro e clica "Aplicar"
   - Filtro é salvo no state com chave `TipocategoriaFilterPage#main`
   - Lista aplica o filtro e recarrega os dados

3. **Navegação:**
   - Usuário navega para outra página e volta
   - Lista automaticamente carrega com o último filtro aplicado
   - Não perde o estado do filtro

### 4. Resultado

**Antes:**
```typescript
// Lista sempre iniciava com filtro padrão
filters: { descricao: '', status_delecao: '0' }
```

**Depois:**
```typescript
// Lista inicia com último filtro aplicado, exemplo:
filters: { descricao: 'categoria teste', status_delecao: '0' }
```

### 5. Vantagens

- ✅ **Persistência automática**: Filtros são mantidos entre navegações
- ✅ **Sincronização**: Lista sempre reflete o último filtro aplicado  
- ✅ **Zero código extra**: Funciona apenas com configuração de inputs
- ✅ **Fallback seguro**: Se não há filtro salvo, usa o padrão
- ✅ **Compatibilidade**: Funciona com filtros existentes sem alteração