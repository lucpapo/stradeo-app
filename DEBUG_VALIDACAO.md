# Debug: Problema com Validação do Filtro

## Problema Identificado
O filtro está carregando do state mas está trazendo todos os dados mesmo com filtro inválido.

## Logs Adicionados
Adicionei logs detalhados para debug:

### 1. No ngOnInit da BaseFiltroDirective
- Mostra se `loadInitialData` está ativo
- Mostra se há StateRef configurado
- Mostra o state carregado
- Mostra se o formulário é válido após validação forçada

### 2. No onApply da BaseFiltroDirective
- Mostra estado do formulário (valid/invalid)
- Mostra erros de validação
- Mostra valor atual do formulário
- Confirma se evento apply foi emitido

## Como Testar

### 1. Abrir Console do Navegador
1. Pressione F12
2. Vá para a aba Console
3. Navegue para a página de tipo categoria

### 2. Verificar Logs
Procure pelos logs com emojis:
- 🔍 Inicialização do filtro
- 📦 State carregado
- ✏️ Filtro aplicado do state
- ✅ Validação do formulário
- 🚀 Chamada do onApply
- ❌ Bloqueio por formulário inválido

### 3. Cenários de Teste

#### Cenário A: Valor Inicial Inválido
- Valor inicial: `descricao: ''` (obrigatório)
- Esperado: Formulário inválido, não carrega dados
- Log esperado: `❌ NÃO chamando onApply() - valor inicial inválido`

#### Cenário B: State com Valor Inválido
1. Preencha filtro com descrição válida
2. Aplique o filtro
3. Navegue para outra página
4. No localStorage, altere o state para descrição vazia:
```javascript
// No console do navegador
let state = JSON.parse(localStorage.getItem('ui-TipocategoriaShellComponent#filter-lista-principal') || '{}');
state.filter.descricao = '';
localStorage.setItem('ui-TipocategoriaShellComponent#filter-lista-principal', JSON.stringify(state));
```
5. Volte para a página
6. Esperado: Formulário inválido, não carrega dados

## Possíveis Problemas

### 1. Validação não está funcionando
Se os logs mostram `✅ Formulário válido` mesmo com descrição vazia, o problema está na configuração dos validadores.

### 2. Evento apply sendo emitido mesmo com formulário inválido
Se os logs mostram `📤 Evento apply emitido` com formulário inválido, há um bug na lógica.

### 3. Lista carregando independente do filtro
Se a lista carrega mesmo sem o evento apply, o problema está na BaseListaPage.

## Próximos Passos

Baseado nos logs, identificar onde está o problema:

1. **Se validação não funciona**: Corrigir configuração dos validadores
2. **Se evento é emitido incorretamente**: Corrigir lógica do onApply
3. **Se lista carrega independente**: Corrigir BaseListaPage

## Comando para Limpar Logs
Para remover os logs após o debug:
```bash
# Buscar e remover todas as linhas com console.log
grep -n "console.log" src/app/corepcode/ui/filter/BaseFiltroDirective.ts
```