# State Provider - MasterApp e Concessionária

## ✅ Funcionalidades Implementadas

- **Inicialização Automática**: Verifica se existe concessionária no estado `ui-MasterAppComponent ConcessionariaSelector#main`
- **Fallback Inteligente**: Se não houver estado salvo, carrega automaticamente a primeira concessionária
- **Refresh Automático**: Dispara refresh da tela quando concessionária muda
- **Eventos Customizados**: `concessionaria-changed` e `concessionaria-refresh`

## Estrutura Hierárquica

- **MasterApp** (Root): `ui-MasterAppComponent` - Configurado no `AppComponent`
- **Concessionária** (Child): `ConcessionariaSelector#main` - Gerenciado pelo `ConcessionariaStateService`

## Como Usar

### 1. Injetar o ConcessionariaStateService

```typescript
import { ConcessionariaStateService } from './concessionaria-state.service';

@Component({...})
export class MeuComponent {
  constructor(private concessionariaState: ConcessionariaStateService) {}
}
```

### 2. Observar mudanças na concessionária

```typescript
ngOnInit() {
  // Opção 1: Via Observable (recomendado)
  this.concessionariaState.concessionaria$.subscribe(concessionaria => {
    if (concessionaria) {
      console.log('Concessionária atual:', concessionaria);
      this.recarregarDados(); // Refresh automático
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
```

### 3. Obter concessionária atual

```typescript
// Forma reativa (Observable)
this.concessionariaState.concessionaria$.subscribe(concessionaria => {
  // usar concessionaria
});

// Forma síncrona
const concessionaria = this.concessionariaState.getConcessionariaSync();
if (concessionaria) {
  console.log(`ID: ${concessionaria.id}, Nome: ${concessionaria.nome}`);
}
```

### 4. Definir nova concessionária

```typescript
const novaConcessionaria = {
  id: 123,
  nome: 'Nova Concessionária',
  cnpj: '12.345.678/0001-90'
};

this.concessionariaState.setConcessionaria(novaConcessionaria);
```

### 5. Verificar se há concessionária selecionada

```typescript
if (this.concessionariaState.hasConcessionaria()) {
  // Há uma concessionária selecionada
  this.carregarDados();
}
```

## Persistência

O estado da concessionária é automaticamente:
- **Salvo** no localStorage quando alterado
- **Restaurado** quando a aplicação é recarregada
- **Limpo** automaticamente após 20 minutos de inatividade

## 🔄 Fluxo Automático

### Inicialização
1. App inicia → `AppComponent` inicializa o estado
2. `ConcessionariaStateService` verifica se há concessionária salva
3. Se existe → restaura, se não → carrega a primeira disponível
4. Notifica todos os subscribers

### Mudança de Concessionária
1. Usuário seleciona nova concessionária
2. Estado é atualizado automaticamente
3. Evento `concessionaria-changed` é disparado
4. Componentes fazem refresh automático dos dados

## Integração com Componentes Existentes

O `ConcessionariaSelectorComponent` já está integrado e usa o state service automaticamente. Qualquer mudança feita através dele será refletida em toda a aplicação com refresh automático.

## 🔄 Opções de Refresh

### 1. Refresh Automático (já implementado)
```typescript
// Acontece automaticamente quando concessionária muda
this.concessionariaState.concessionaria$.subscribe(concessionaria => {
  this.recarregarDados(); // Seu código aqui
});
```

### 2. Refresh Manual dos Dados
```typescript
// Força refresh da concessionária atual
this.concessionariaState.refreshConcessionariaAtual();
```

### 3. Refresh Completo da Tela
```typescript
// Força refresh da rota atual
this.concessionariaState.forcePageRefresh();
```

### 4. Refresh Hard da Página
```typescript
// Recarrega a página inteira
window.location.reload();
```

## 📚 Documentação Adicional

- `documentacao/concessionaria-state-usage.md` - Guia completo de uso
- `documentacao/exemplo-componente-com-refresh.ts` - Exemplo prático de implementação
- `documentacao/exemplo-refresh-manual.ts` - Exemplos de refresh manual