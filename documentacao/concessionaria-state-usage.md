# Como usar o ConcessionariaStateService

## Funcionalidade Implementada

O sistema agora verifica automaticamente se existe uma concessionária salva no estado `ui-MasterAppComponent ConcessionariaSelector#main`. Se existir, usa essa concessionária. Se não existir, carrega automaticamente a primeira concessionária disponível.

Quando a concessionária é alterada, o sistema:
1. Salva no estado
2. Notifica todos os subscribers
3. Dispara um evento customizado `concessionaria-changed`
4. Faz refresh automático da tela

## Como usar em componentes

### 1. Escutar mudanças de concessionária

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConcessionariaStateService } from '../shared/component/concessionaria-selector/concessionaria-state.service';

@Component({...})
export class MeuComponent implements OnInit, OnDestroy {
  
  constructor(private concessionariaState: ConcessionariaStateService) {}

  ngOnInit() {
    // Opção 1: Via Observable
    this.concessionariaState.concessionaria$.subscribe(concessionaria => {
      if (concessionaria) {
        console.log('Concessionária alterada:', concessionaria);
        this.recarregarDados();
      }
    });

    // Opção 2: Via método utilitário
    this.concessionariaState.onConcessionariaChange(concessionaria => {
      this.recarregarDados();
    });

    // Opção 3: Via evento customizado
    window.addEventListener('concessionaria-changed', (event: any) => {
      console.log('Evento de mudança:', event.detail);
      this.recarregarDados();
    });
  }

  private recarregarDados() {
    // Sua lógica de reload aqui
  }
}
```

### 2. Obter concessionária atual

```typescript
// Síncrono
const concessionaria = this.concessionariaState.getConcessionariaSync();

// Via Observable
this.concessionariaState.concessionaria$.subscribe(concessionaria => {
  // usar concessionaria
});
```

### 3. Alterar concessionária

```typescript
const novaConcessionaria = {
  id: 123,
  nome: 'Nova Concessionária',
  cnpj: '12.345.678/0001-90'
};

this.concessionariaState.setConcessionaria(novaConcessionaria);
// Isso automaticamente salva no estado e dispara refresh
```

## Eventos Disponíveis

- `concessionaria-changed`: Disparado quando a concessionária é alterada
- `concessionaria-refresh`: Disparado quando é forçado um refresh

## Estado Persistente

O estado é salvo em `ui-MasterAppComponent ConcessionariaSelector#main` e persiste entre navegações e reloads da aplicação.