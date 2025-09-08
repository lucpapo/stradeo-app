# 🧪 Instruções para Teste e Debug do Clique no IP

## Como Testar

### 1. Abrir a Aplicação
- Execute `ng serve` se não estiver rodando
- Navegue até a página com a simulação de tabela

### 2. Abrir Logs de Segurança
- Clique no botão "Log de Segurança" de qualquer item da tabela
- Um offcanvas deve abrir mostrando os logs

### 3. Verificar Console
Abra o console do navegador (F12) e procure por estas mensagens:

```
📤 Dados sendo passados para o offcanvas: {objeto com dados}
📤 Callbacks definidos: true
🔧 onOffcanvasInit chamado no TableOffcanvasContentComponent
🔧 callbacks recebidos: true
🔧 callbacks.openIpDetails: true
🔧 itemId atual: "1" (ou outro número)
```

### 4. Testar Clique no IP
**Opção A: Clique Direto no IP**
- Clique em qualquer badge azul com IP (ex: "📍 192.168.1.100")
- Verifique no console se aparece:
```
🎯 onIpClick chamado diretamente: 192.168.1.100 1
🚀 Chamando callback openIpDetails diretamente
🔥 Callback openIpDetails chamado: 192.168.1.100 1
```

**Opção B: Botão de Teste**
- Clique no botão "🧪 Teste IP" no rodapé do offcanvas
- Verifique se o callback é executado

### 5. Resultados Esperados

#### ✅ Se Funcionar:
- Um novo offcanvas deve abrir do lado direito
- Deve mostrar "Detalhes do IP - 192.168.1.100"
- Console deve mostrar logs de sucesso

#### ❌ Se Não Funcionar:
Verifique qual mensagem aparece no console:

**Problema 1: Callbacks não chegam**
```
❌ Callback não disponível ou itemId faltando
  - callbacks: undefined
```
→ **Solução**: Problema na passagem de dados

**Problema 2: itemId undefined**
```
❌ Callback não disponível ou itemId faltando
  - itemId: undefined
```
→ **Solução**: Problema na conversão do itemId

**Problema 3: Erro na execução**
```
❌ Erro ao executar callback: [erro]
```
→ **Solução**: Problema no método openIpDetails

## Debug Detalhado

### Verificar Dados Passados
No console, procure por:
```
📤 Dados sendo passados para o offcanvas:
```
Verifique se contém:
- `callbacks.openIpDetails`: função
- `itemId`: string com número
- `offcanvasType`: "logs"

### Verificar Inicialização
Procure por:
```
🔧 onOffcanvasInit chamado no TableOffcanvasContentComponent
```
Se não aparecer, o problema está no container.

### Verificar Clique
Procure por:
```
🎯 onIpClick chamado diretamente:
```
Se não aparecer, o evento de clique não está funcionando.

## Próximos Passos

Baseado nos logs que você ver, me informe:

1. **Quais mensagens aparecem no console?**
2. **O offcanvas de logs abre normalmente?**
3. **O clique no IP gera algum log?**
4. **O botão "🧪 Teste IP" funciona?**

Com essas informações, posso identificar exatamente onde está o problema e corrigi-lo.

## Comandos Úteis

```bash
# Executar aplicação
ng serve

# Build para verificar erros
ng build --configuration development

# Limpar cache se necessário
ng build --configuration development --delete-output-path
```