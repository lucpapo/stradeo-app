# Soluções para Filtros Múltiplos Isolados

## Problema
Você tem dois filtros com states independentes (`#main` e `#main2`), mas ambos compartilham o mesmo `gerenciador` da lista. Quando um filtro aplica/limpa, afeta o outro também.

## Solução 1: Simples - Métodos Específicos

### Vantagens
- ✅ Implementação rápida e fácil
- ✅ Mantém compatibilidade com código existente
- ✅ Permite logs/comportamentos específicos por filtro

### Desvantagens
- ❌ Filtros ainda compartilham o mesmo resultado da lista
- ❌ Aplicar um filtro sobrescreve o outro

### Implementação
```typescript
// No componente da lista
aplicarFiltro1(filtro: TipocategoriaFilterValue): void {
  console.log('Filtro 1 aplicado:', filtro);
  this.gerenciador.aplicarFiltro(filtro);
}

aplicarFiltro2(filtro: TipocategoriaFilterValue): void {
  console.log('Filtro 2 aplicado:', filtro);
  this.gerenciador.aplicarFiltro(filtro);
}
```

```html
<!-- No template -->
<app-tipocategoria-filter 
  [componentKey]="'TipocategoriaFilterPage#main2'" 
  (apply)="aplicarFiltro1($event)">
</app-tipocategoria-filter>

<app-tipocategoria-filter 
  [componentKey]="'TipocategoriaFilterPage#main'" 
  (apply)="aplicarFiltro2($event)">
</app-tipocategoria-filter>
```

## Solução 2: Avançada - Múltiplos Gerenciadores

### Vantagens
- ✅ Cada filtro tem seu próprio resultado independente
- ✅ Filtros não se afetam mutuamente
- ✅ Cada filtro mantém seu próprio estado de loading/paginação
- ✅ Permite comparação lado a lado de resultados

### Desvantagens
- ❌ Mais complexo de implementar
- ❌ Múltiplas chamadas à API
- ❌ Maior uso de memória

### Implementação
```typescript
// No BaseListaPage (já implementado)
protected obterGerenciadorParaFiltro(filtroKey: string): IGerenciadorLista<TRow, TFilter, TKey> {
  if (this.gerenciadores.has(filtroKey)) {
    return this.gerenciadores.get(filtroKey)!;
  }
  // Cria novo gerenciador independente...
}

// No componente da lista
get gerenciador1() {
  return this.obterGerenciadorParaFiltro('TipocategoriaFilterPage#main2');
}

get gerenciador2() {
  return this.obterGerenciadorParaFiltro('TipocategoriaFilterPage#main');
}
```

```html
<!-- No template -->
<app-tipocategoria-filter 
  [value]="gerenciador1.filterValue()"
  [componentKey]="'TipocategoriaFilterPage#main2'" 
  (apply)="gerenciador1.aplicarFiltro($event)">
</app-tipocategoria-filter>
<small>Resultados: {{gerenciador1.total()}}</small>

<app-tipocategoria-filter 
  [value]="gerenciador2.filterValue()"
  [componentKey]="'TipocategoriaFilterPage#main'" 
  (apply)="gerenciador2.aplicarFiltro($event)">
</app-tipocategoria-filter>
<small>Resultados: {{gerenciador2.total()}}</small>
```

## Solução 3: Híbrida - Filtro Mestre

### Conceito
Um filtro "mestre" que combina os valores de ambos os filtros:

```typescript
combinarFiltros(): void {
  const filtro1 = this.obterFiltroDoState('TipocategoriaFilterPage#main2');
  const filtro2 = this.obterFiltroDoState('TipocategoriaFilterPage#main');
  
  const filtroCombiado = {
    ...filtro1,
    ...filtro2,
    // Lógica de combinação específica
  };
  
  this.gerenciador.aplicarFiltro(filtroCombiado);
}
```

## Recomendação

**Para seu caso de uso (isolamento de componentes):**
- Use **Solução 2 (Avançada)** se você quer que cada filtro mostre resultados independentes
- Use **Solução 1 (Simples)** se você quer apenas logs/comportamentos diferentes mas o mesmo resultado

A **Solução 2** é mais alinhada com o conceito de "isolamento" que você mencionou, pois cada filtro realmente funciona de forma independente.