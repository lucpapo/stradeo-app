# DEBUG: Conflito de IDs - Offcanvas de Localização

## Problema Identificado
O offcanvas de localização não abre do lado esquerdo porque há conflito de IDs.

## Análise do Código

### IDs Definidos
```typescript
private readonly OFFCANVAS_IDS = {
  SECURITY_LOGS: 'offseguranca',
  ITEM_DATA: 'offitem', 
  IP_DETAILS: 'logip',
  IP_LOCATION: 'loglocation'  // ← PROBLEMA AQUI
} as const;
```

### Problema
1. **IP Details** usa ID fixo: `'logip'`
2. **IP Location** deveria usar ID fixo: `'loglocation'`
3. Mas no código, estou criando ID único com timestamp
4. O Bootstrap pode estar reutilizando elementos DOM

### Verificação do Serviço
- Método `isOpenById(id: string)` existe ✅
- Método `closeById(id: string)` existe ✅
- Stack tracking funciona ✅

## Solução Implementada

### 1. IDs Únicos com Timestamp + Random
```typescript
const timestamp = Date.now();
const randomSuffix = Math.random().toString(36).substring(2, 8);
const uniqueId = `location-${ip.replace(/\./g, '-')}-${itemId}-${timestamp}-${randomSuffix}`;
```

### 2. Nunca Verificar ID Existente
```typescript
// SEMPRE criar novo offcanvas - nunca verificar se existe
console.log('🌍 FORÇANDO novo offcanvas de localização - sempre empilhar');
```

### 3. Logs Detalhados
- Timestamp de criação
- ID único gerado
- Estado da pilha antes/depois
- Verificação DOM pós-criação

## Teste
1. Abrir logs de segurança
2. Clicar em IP (abre detalhes do lado direito)
3. Clicar em "Ver Localização" (deve abrir do lado esquerdo)
4. Verificar logs no console

## Status
🔧 **IMPLEMENTADO** - Aguardando teste