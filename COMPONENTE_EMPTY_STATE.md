# Componente Empty State

Componente reutilizável para exibir estado vazio em tabelas.

## Características

- ✅ **Integrado à tabela**: Aparece como uma linha da tabela
- ✅ **Responsivo**: Se adapta ao número de colunas especificado
- ✅ **Customizável**: Textos e ícones configuráveis
- ✅ **Reutilizável**: Pode ser usado em qualquer lista
- ✅ **Simples**: Sem botões ou badges desnecessários
- ✅ **Acessível**: Semântica correta e navegação por teclado

## Uso Básico

### 1. Importar o Componente
```typescript
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  imports: [EmptyStateComponent],
  // ...
})
```

### 2. Usar no Template
```html
<tbody>
  <!-- Dados da tabela -->
  <tr *ngFor="let item of items">
    <!-- ... colunas ... -->
  </tr>

  <!-- Estado vazio -->
  <app-empty-state 
    *ngIf="!loading && !items.length"
    [colspan]="6">
  </app-empty-state>
</tbody>
```

## Propriedades (Inputs)

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `colspan` | `number` | `6` | Número de colunas da tabela |
| `iconClass` | `string` | `'fa fa-database text-primary'` | Classes CSS do ícone |
| `title` | `string` | `'Nenhum dado encontrado'` | Título principal |
| `subtitle` | `string` | `'Não existem registros para os critérios selecionados'` | Subtítulo |
| `hint` | `string` | `'Tente ajustar os filtros ou refazer a pesquisa'` | Dica para o usuário (opcional) |

## Exemplos de Customização

### 1. Estado Vazio Simples
```html
<app-empty-state 
  [colspan]="4"
  title="Nenhum usuário encontrado"
  subtitle="Não há usuários cadastrados no sistema">
</app-empty-state>
```

### 2. Com Ícone Personalizado
```html
<app-empty-state 
  [colspan]="5"
  iconClass="fa fa-users text-info"
  title="Lista vazia"
  subtitle="Adicione o primeiro item">
</app-empty-state>
```

### 3. Sem Dica
```html
<app-empty-state 
  [colspan]="3"
  title="Sem resultados"
  subtitle="Nenhum resultado para sua busca">
</app-empty-state>
```

### 4. Customizado Completo
```html
<app-empty-state 
  [colspan]="7"
  iconClass="fa fa-search text-warning"
  title="Busca sem resultados"
  subtitle="Não encontramos nada com esses critérios"
  hint="Tente usar termos diferentes ou menos específicos">
</app-empty-state>
```

## Integração com Listas

### Exemplo Completo
```html
<div class="card">
  <div class="table-responsive">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <!-- Loading -->
        <tr *ngIf="loading">
          <td colspan="5" class="text-center py-4">
            <div class="spinner-border" role="status"></div>
          </td>
        </tr>

        <!-- Dados -->
        <tr *ngFor="let user of users">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.status }}</td>
          <td>
            <button class="btn btn-sm btn-primary">Editar</button>
          </td>
        </tr>

        <!-- Estado vazio -->
        <app-empty-state 
          *ngIf="!loading && !users.length"
          [colspan]="5">
        </app-empty-state>
      </tbody>
    </table>
  </div>
</div>
```

## Estilos

O componente inclui estilos próprios que seguem o design system:

- **Background**: Cinza claro (`#f8f9fa`)
- **Ícone**: 3rem de tamanho, cor primária
- **Textos**: Hierarquia de cores (título → subtítulo → dica)
- **Layout**: Centralizado com largura máxima de 400px

## Acessibilidade

- ✅ Estrutura semântica correta (`<tr>` e `<td>`)
- ✅ Contraste adequado de cores
- ✅ Navegação por teclado funcional
- ✅ Textos descritivos claros

## Simplicidade

✅ **Componente focado e simples!**

O componente foi simplificado para ser mais direto e fácil de usar:

- **Sem botão de atualizar**: Foco apenas na exibição da mensagem
- **Sem badge de quantidade**: Visual mais limpo
- **Colspan obrigatório**: Controle preciso sobre o layout
- **Apenas o essencial**: Ícone, título, subtítulo e dica opcional

```html
<!-- Uso simples e direto -->
<app-empty-state [colspan]="6"></app-empty-state>
```

## Vantagens

1. **Simplicidade**: Componente focado e direto
2. **Consistência**: Mesmo visual em todas as listas
3. **Manutenibilidade**: Mudanças centralizadas
4. **Flexibilidade**: Textos e ícones customizáveis
5. **Performance**: Componente leve e otimizado
6. **Controle**: Colspan preciso para cada tabela
7. **Visual limpo**: Sem elementos desnecessários