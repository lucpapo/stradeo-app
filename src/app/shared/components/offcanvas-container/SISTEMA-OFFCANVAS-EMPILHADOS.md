# Sistema de Offcanvas Empilhados com Backdrop

## 🎯 Funcionalidade Implementada

Sistema de offcanvas empilhados com backdrop opcional, permitindo múltiplas camadas de offcanvas sobrepostos com controle granular de backdrop.

## 📋 Estrutura do Sistema

### 1. Log de Segurança (Nível 1)
- **ID único**: `'offseguranca'`
- **Posição**: `start` (esquerda)
- **Largura**: 50%
- **Backdrop**: Opcional (controlado pelo switch)
- **Funcionalidade**: Lista logs de segurança com IPs clicáveis

### 2. Detalhes do IP (Nível 2)
- **ID único**: `'logip'`
- **Posição**: `end` (direita)
- **Largura**: 30%
- **Backdrop**: Sempre ativo (cobre o offcanvas anterior)
- **Funcionalidade**: Mostra detalhes do IP selecionado

### 3. Localização do IP (Nível 3)
- **ID único**: `'loglocation'`
- **Posição**: `end` (direita)
- **Largura**: 35%
- **Backdrop**: Sempre ativo (cobre o offcanvas anterior)
- **Funcionalidade**: Mostra localização geográfica do IP

## 🔧 Como Funciona

### Fluxo de Abertura
```
1. Usuário clica em "Log de Segurança"
   ↓
2. Abre offcanvas com logs (backdrop opcional)
   ↓
3. Usuário clica em um IP (badge azul)
   ↓
4. Abre offcanvas de detalhes do IP (30%, backdrop sobre anterior)
   ↓
5. Usuário clica em "Ver Localização"
   ↓
6. Abre offcanvas de localização (35%, backdrop sobre anterior)
```

### Controle de Pilha
- **Mesmo item**: Offcanvas coexistem (máximo 3 níveis)
- **Item diferente**: Limpa toda a pilha e abre novo
- **IDs únicos**: Previne duplicação por tipo
- **Backdrop empilhado**: Cada nível cobre o anterior

## 🎭 Configuração de Backdrop

### Switch "Com/Sem Backdrop"
- **Ativo**: Log de Segurança abre com backdrop
- **Inativo**: Log de Segurança abre sem backdrop
- **IPs**: Sempre empilham com backdrop (independente do switch)

### Comportamento por Nível
```
Nível 1 (Log): backdrop opcional
Nível 2 (IP): backdrop sempre ativo
Nível 3 (Localização): backdrop sempre ativo
```

## 📊 IDs Únicos

```typescript
private readonly OFFCANVAS_IDS = {
  SECURITY_LOGS: 'offseguranca',    // Log de Segurança
  ITEM_DATA: 'offitem',             // Dados do Item
  IP_DETAILS: 'logip',              // Detalhes do IP
  IP_LOCATION: 'loglocation'        // Localização do IP
} as const;
```

## 🎨 Classes CSS Adicionadas

```scss
.offcanvas-class-30 {
  width: 30% !important;
  max-width: 30% !important;
}

.offcanvas-class-35 {
  width: 35% !important;
  max-width: 35% !important;
}
```

## 🔄 Fluxo de Fechamento

### Fechamento Manual
- **X do cabeçalho**: Fecha o offcanvas específico
- **Botão "❌ Fechar"**: Fecha o offcanvas específico
- **Botão "🗑️ Fechar Todos"**: Fecha toda a pilha

### Fechamento Automático
- **Linha diferente**: Limpa toda a pilha automaticamente
- **Limpeza da pilha**: Remove itens automaticamente quando fechados

## 🎯 Exemplo de Uso

### Cenário 1: Empilhamento Completo
```
1. Clique "Log de Segurança" → Pilha: 1
2. Clique IP "192.168.1.100" → Pilha: 2 (backdrop sobre anterior)
3. Clique "Ver Localização" → Pilha: 3 (backdrop sobre anterior)
4. Resultado: 3 offcanvas empilhados com backdrop
```

### Cenário 2: Fechamento Sequencial
```
1. Fechar Localização → Pilha: 2 (volta para IP)
2. Fechar IP → Pilha: 1 (volta para Log)
3. Fechar Log → Pilha: 0 (tela limpa)
```

### Cenário 3: Troca de Item
```
1. Item 1 - Log + IP + Localização → Pilha: 3
2. Clique Item 2 - Log → Pilha limpa automaticamente → Pilha: 1
3. Novo contexto iniciado
```

## ✅ Funcionalidades Implementadas

### Controle de Backdrop
- ✅ Switch para ativar/desativar backdrop no Log de Segurança
- ✅ IPs sempre empilham com backdrop
- ✅ Cada nível cobre o anterior com backdrop

### IDs Únicos
- ✅ Previne duplicação por tipo de offcanvas
- ✅ Permite coexistência de tipos diferentes
- ✅ Controle granular por ID

### Empilhamento
- ✅ Até 3 níveis de offcanvas empilhados
- ✅ Z-index automático por nível
- ✅ Larguras diferenciadas (50%, 30%, 35%)

### Interface Intuitiva
- ✅ IPs como badges clicáveis
- ✅ Botões com ícones e tooltips
- ✅ Alertas informativos em cada nível
- ✅ Contador de pilha em tempo real

### Limpeza Automática
- ✅ Pilha limpa automaticamente ao trocar de item
- ✅ Remoção automática quando offcanvas é fechado
- ✅ Atualização do contador em tempo real

## 🎯 Resultado Final

Sistema completo de offcanvas empilhados com:
- **3 níveis** de empilhamento
- **Backdrop opcional** no primeiro nível
- **Backdrop obrigatório** nos níveis superiores
- **IDs únicos** para controle granular
- **Limpeza automática** da pilha
- **Interface intuitiva** com feedback visual

### Teste Recomendado
1. Ativar switch "Com Backdrop"
2. Abrir "Log de Segurança" → Verificar backdrop
3. Clicar em IP → Verificar empilhamento com backdrop
4. Clicar "Ver Localização" → Verificar terceiro nível
5. Fechar sequencialmente → Verificar pilha diminuindo
6. Trocar de item → Verificar limpeza automática