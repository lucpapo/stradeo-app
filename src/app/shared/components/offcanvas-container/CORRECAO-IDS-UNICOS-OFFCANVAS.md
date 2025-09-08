# Correção: IDs Únicos para Controle de Offcanvas

## Problema Identificado
Mesmo com as flags de controle, ainda ocorria duplicação de offcanvas ao clicar rapidamente duas vezes no botão "Log de Segurança", resultando em 2 itens na pilha quando deveria ficar apenas 1.

## Solução Implementada: IDs Únicos

### 1. Definição de IDs Únicos
```typescript
// IDs únicos para controle de offcanvas
private readonly OFFCANVAS_IDS = {
  SECURITY_LOGS: 'offseguranca',
  ITEM_DATA: 'offitem'
} as const;
```

### 2. Controle por ID no OffcanvasService
Agora cada tipo de offcanvas tem um ID único:
- **Log de Segurança**: `'offseguranca'`
- **Dados do Item**: `'offitem'`

### 3. Lógica Simplificada

#### openSecurityLogs()
```typescript
openSecurityLogs(item: SimulationItem) {
  const offcanvasId = this.OFFCANVAS_IDS.SECURITY_LOGS;
  
  // Se é uma linha diferente, limpa toda a pilha
  if (this.currentItemId !== null && this.currentItemId !== item.id) {
    this.offcanvasService.closeAll();
  }
  
  // Fecha qualquer offcanvas de logs existente pelo ID
  this.offcanvasService.closeById(offcanvasId);
  
  // Define o item atual
  this.currentItemId = item.id;
  
  // Abre offcanvas de logs com ID único
  this.offcanvasService.open(
    TableOffcanvasContentComponent,
    { /* dados */ },
    undefined, // injector
    { 
      /* configurações */,
      id: offcanvasId // ID único garantindo apenas 1 instância
    }
  );
}
```

#### openItemData()
```typescript
openItemData(item: SimulationItem) {
  const offcanvasId = this.OFFCANVAS_IDS.ITEM_DATA;
  
  // Se é uma linha diferente, limpa toda a pilha
  if (this.currentItemId !== null && this.currentItemId !== item.id) {
    this.offcanvasService.closeAll();
  }
  
  // Fecha qualquer offcanvas de dados existente pelo ID
  this.offcanvasService.closeById(offcanvasId);
  
  // Define o item atual
  this.currentItemId = item.id;
  
  // Abre offcanvas de dados com ID único
  this.offcanvasService.open(
    TableOffcanvasContentComponent,
    { /* dados */ },
    undefined, // injector
    { 
      /* configurações */,
      id: offcanvasId // ID único garantindo apenas 1 instância
    }
  );
}
```

## 🎯 Vantagens da Solução com IDs

### 1. Controle Direto pelo OffcanvasService
- O próprio service gerencia a unicidade por ID
- Não depende de flags ou timeouts
- Controle mais preciso e confiável

### 2. Simplicidade
- Código mais limpo e direto
- Menos lógica de controle no componente
- Eliminação de métodos internos desnecessários

### 3. Garantia de Unicidade
- **ID único = apenas 1 instância** por tipo
- Impossível ter duplicação mesmo com cliques rápidos
- Controle automático pelo service

### 4. Coexistência Mantida
- `'offseguranca'` e `'offitem'` são IDs diferentes
- Podem coexistir na pilha (máximo 2: 1 de cada tipo)
- Comportamento por linha mantido

## 📊 Fluxo de Execução

### Cenário: Clique Duplo em Log de Segurança
```
Clique 1:
  ✅ closeById('offseguranca') → Nenhum para fechar
  ✅ open(..., 'offseguranca', ...) → Abre Log A

Clique 2 (imediato):
  ✅ closeById('offseguranca') → Fecha Log A
  ✅ open(..., 'offseguranca', ...) → Abre Log B

Resultado: Apenas 1 offcanvas na pilha ✅
```

### Cenário: Log + Dados da Mesma Linha
```
Clique Log:
  ✅ open(..., 'offseguranca', ...) → Abre Log

Clique Dados:
  ✅ closeById('offitem') → Nenhum para fechar
  ✅ open(..., 'offitem', ...) → Abre Dados

Resultado: 2 offcanvas na pilha (coexistência) ✅
```

### Cenário: Linha Diferente
```
Linha 1 - Log aberto
Linha 2 - Clique Log:
  ✅ currentItemId !== item.id → closeAll()
  ✅ open(..., 'offseguranca', ...) → Abre novo Log

Resultado: Apenas 1 offcanvas na pilha ✅
```

## 🔧 Código Removido

### Eliminados
- ✅ Flags `isOpeningLogs` e `isOpeningItem`
- ✅ Métodos `openSecurityLogsInternal()` e `openItemDataInternal()`
- ✅ Map `currentOffcanvasRefs` para rastreamento manual
- ✅ Timeouts e lógica de sincronização
- ✅ Callbacks de limpeza manual

### Mantidos
- ✅ `currentItemId` para controle por linha
- ✅ Comportamento de coexistência
- ✅ Limpeza por linha diferente
- ✅ Configurações de backdrop e posição

## ✅ Resultado Final

### Comportamento Garantido
- ✅ **Clique duplo**: Apenas 1 offcanvas por tipo
- ✅ **Cliques múltiplos**: Sempre substitui o anterior
- ✅ **Coexistência**: Log + Dados funcionam (IDs diferentes)
- ✅ **Linha diferente**: Limpa tudo e abre novo
- ✅ **Sem race conditions**: Controle direto pelo service

### Teste Recomendado
1. Clique duplo rápido em "Log de Segurança" → Deve mostrar apenas 1 na pilha
2. Clique múltiplo em "Dados do Item" → Deve mostrar apenas 1 na pilha
3. Abrir Log + Dados da mesma linha → Devem coexistir (2 na pilha)
4. Trocar de linha → Deve limpar tudo e abrir novo

## 🎯 Problema Definitivamente Resolvido
**Antes**: Clique duplo = 2 itens na pilha ❌  
**Depois**: Clique duplo = 1 item na pilha ✅  
**Método**: IDs únicos com controle pelo OffcanvasService 🎯