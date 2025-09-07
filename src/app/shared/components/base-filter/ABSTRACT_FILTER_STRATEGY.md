# AbstractFilterStrategy

Classe abstrata que implementa a lógica comum para estratégias de filtro, reduzindo duplicação de código e padronizando comportamentos.

## Benefícios

- **Redução de código**: Elimina duplicação de lógica comum
- **Padronização**: Garante comportamento consistente entre filtros
- **Manutenibilidade**: Mudanças na lógica comum afetam todas as estratégias
- **Métodos utilitários**: Fornece helpers para validações comuns

## Como usar

### 1. Estenda a classe abstrata

```typescript
export class MinhaFilterStrategy extends AbstractFilterStrategy<MeuTipoFilter> {
  // Implementar apenas métodos obrigatórios
}
```

### 2. Defina o valor inicial

```typescript
protected readonly initialValue = MEU_FILTER_INITIAL_VALUE;
```

### 3. Implemente apenas os métodos essenciais

```typescript
// Controles do formulário (obrigatório)
createFormControls(savedData?: MeuTipoFilter): { [key: string]: any } {
  const data = savedData || this.initialValue;
  return {
    campo1: [data.campo1, this.createStringValidators(100, true)],
    campo2: [data.campo2]
  };
}

// Labels dos campos (obrigatório)
getFieldLabels(): { [key: string]: string } {
  return {
    campo1: 'Campo 1',
    campo2: 'Campo 2'
  };
}

// OPCIONAL: Definir campos obrigatórios para pesquisa (recomendado)
protected getRequiredSearchFields(): string[] {
  return ['campo1']; // Pelo menos um desses deve ter conteúdo
}
```

## Métodos herdados automaticamente

- `getInitialValue()`: Retorna o valor inicial
- `isInitialValue()`: Compara com valor inicial usando JSON
- `validateForm()`: Validação padrão do Angular
- `transformData()`: Aplica trim em strings automaticamente
- `hasValidSearchData()`: Implementação inteligente baseada em campos obrigatórios ou diferença do valor inicial

## Métodos utilitários disponíveis

### `createStringValidators(maxLength?, required?)`
Cria validadores comuns para campos string:
```typescript
[data.nome, this.createStringValidators(50, true)] // required + maxLength(50)
```

### `hasValidStringContent(value)`
Verifica se string tem conteúdo válido (não vazia após trim):
```typescript
return this.hasValidStringContent(formValue.descricao);
```

### `hasAnyValidContent(formValue, fields)`
Verifica se pelo menos um dos campos tem conteúdo:
```typescript
return this.hasAnyValidContent(formValue, ['nome', 'codigo']);
```

### `getRequiredSearchFields()` (opcional)
Define campos obrigatórios para pesquisa:
```typescript
protected getRequiredSearchFields(): string[] {
  return ['nome']; // Pelo menos este campo deve ter conteúdo
}
```

## Validação de pesquisa - 3 opções

### Opção 1: Campos obrigatórios (recomendado)
```typescript
protected getRequiredSearchFields(): string[] {
  return ['campo1', 'campo2']; // Pelo menos um deve ter conteúdo
}
// hasValidSearchData é implementado automaticamente
```

### Opção 2: Lógica customizada
```typescript
hasValidSearchData(formValue: any): boolean {
  return this.hasValidStringContent(formValue.nome) || 
         formValue.ativo === false;
}
```

### Opção 3: Padrão (sem definir nada)
```typescript
// Usa implementação padrão: verifica se há diferença do valor inicial
// Não precisa implementar nada
```

## Sobrescrevendo comportamentos

Você pode sobrescrever qualquer método se precisar de comportamento específico:

```typescript
// Comparação customizada para isInitialValue
isInitialValue(value: MeuTipoFilter): boolean {
  return value.campo1 === this.initialValue.campo1 &&
         value.campo2 === this.initialValue.campo2;
}

// Transformação customizada
transformData(data: MeuTipoFilter): MeuTipoFilter {
  return {
    ...super.transformData(data), // Aplica trim padrão
    codigo: data.codigo?.toUpperCase() // Transformação específica
  };
}
```

## Exemplo completo

Veja `examples/example-filter.strategy.ts` para um exemplo completo de implementação.

## Migração de estratégias existentes

1. Mude `implements FilterStrategy<T>` para `extends AbstractFilterStrategy<T>`
2. Adicione `protected readonly initialValue = SEU_VALOR_INICIAL`
3. Remova métodos que têm implementação padrão adequada
4. Use métodos utilitários onde possível
5. Teste para garantir que o comportamento permanece o mesmo