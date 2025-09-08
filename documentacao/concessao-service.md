# Serviço de Concessão

## Implementação Realizada

Foi implementado um serviço completo de concessão baseado no `BaseService` seguindo o padrão já estabelecido no projeto.

### Arquivos Criados

1. **Model Completo** (`src/app/corestradeo/domain/models/concessao.model.ts`)
   - Interface `Concessao` com todos os campos do endpoint principal
   - Interface `ConcessaoCombo` para o endpoint combo

2. **Tipos de Filtro** (`src/app/corestradeo/domain/types/concessao-filter.types.ts`)
   - Interface `ConcessaoFilterValue` para filtros de busca

3. **Serviço** (`src/app/corestradeo/services/concessao.service.ts`)
   - Estende `BaseService` com tipagem completa
   - Métodos para endpoint combo (tipado e não tipado)

### Integração com Concessionaria Selector

O serviço `ConcessionariaService` foi atualizado para usar o novo `ConcessaoService`:

```typescript
getConcessionarias(): Observable<Concessionaria[]> {
  return this.concessaoService.getCombo().pipe(
    map(dados => dados.map(item => ({
      id: item.id,
      nome: item.nome,
      cnpj: item.cnpj_concessao || ''
    })))
  );
}
```

## Como Usar

### 1. Endpoint Principal (Tipado)
```typescript
// Listar todas as concessões com filtros
this.concessaoService.listTyped({
  filter: { nome: 'PAZ', status_delecao: 0 },
  page: 1,
  size: 10
}).subscribe(result => {
  console.log(result.data); // Concessao[]
  console.log(result.total); // number
});

// Buscar uma concessão específica
this.concessaoService.getTyped(1).subscribe(concessao => {
  console.log(concessao); // Concessao
});
```

### 2. Endpoint Principal (Dinâmico)
```typescript
// Para desenvolvimento rápido sem tipagem
this.concessaoService.list({
  filter: { nome: 'PAZ' }
}).subscribe(result => {
  console.log(result.data); // any[]
});
```

### 3. Endpoint Combo
```typescript
// Não tipado (para dropdowns/selectors)
this.concessaoService.getCombo().subscribe(dados => {
  console.log(dados); // any[]
});

// Tipado (quando precisar de type safety)
this.concessaoService.getComboTyped().subscribe(dados => {
  console.log(dados); // ConcessaoCombo[]
});
```

### 4. Operações CRUD
```typescript
// Criar
this.concessaoService.create({
  nome: 'Nova Concessionária',
  razao_concessao: 'Razão Social'
}).subscribe(result => {
  console.log('Criado:', result);
});

// Atualizar
this.concessaoService.update(1, {
  nome: 'Nome Atualizado'
}).subscribe(result => {
  console.log('Atualizado:', result);
});

// Deletar
this.concessaoService.delete(1).subscribe(() => {
  console.log('Deletado com sucesso');
});
```

## Estrutura dos Dados

### Endpoint Principal (`/Concessao`)
```json
{
  "error": false,
  "mensagem": "Operacao realizada com sucesso",
  "totalRegistros": 2,
  "dados": [
    {
      "total_registros": 2,
      "id": 1,
      "codigo_msg": "1",
      "nome": "Concessionária PAZ",
      "razao_concessao": "Concessionária PAZ2",
      "cnpj_concessao": "07.885.997/0001-53",
      // ... outros campos
    }
  ]
}
```

### Endpoint Combo (`/Concessao/combo`)
```json
{
  "error": false,
  "mensagem": "Operacao realizada com sucesso",
  "totalRegistros": 2,
  "dados": [
    {
      "id": 2,
      "nome": "Concessionária 2",
      "cnpj_concessao": "07.885.997/0001-53"
    }
  ]
}
```

## Benefícios da Implementação

1. **Type Safety**: Tipagem completa quando necessário
2. **Flexibilidade**: Métodos dinâmicos para desenvolvimento rápido
3. **Consistência**: Segue o padrão já estabelecido no projeto
4. **Reutilização**: Aproveita toda a funcionalidade do BaseService
5. **Integração**: Funciona perfeitamente com o componente existente

## Próximos Passos

O serviço está pronto para uso. O componente `concessionaria-selector` já foi atualizado para usar o endpoint combo real em vez dos dados mockados.