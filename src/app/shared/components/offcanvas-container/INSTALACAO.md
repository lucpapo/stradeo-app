# Instalação e Configuração do Sistema de Offcanvas

## ✅ Arquivos Criados

O sistema de offcanvas foi implementado com sucesso! Os seguintes arquivos foram criados:

### Serviços
- `src/app/shared/services/offcanvas.service.ts` - Serviço principal
- `src/app/shared/services/offcanvas-example.service.ts` - Serviço de exemplo

### Componentes
- `src/app/shared/components/offcanvas-container/offcanvas-container.component.ts` - Container principal
- `src/app/shared/components/offcanvas-container/example-offcanvas-content.component.ts` - Exemplo de conteúdo
- `src/app/shared/components/offcanvas-container/usage-example.component.ts` - Exemplo de uso
- `src/app/shared/components/offcanvas-container/offcanvas-test-page.component.ts` - Página de teste

### Estilos
- `src/app/shared/styles/offcanvas.scss` - Estilos personalizados
- Estilos foram incluídos no `src/styles.scss`

### Documentação
- `README.md` - Documentação completa
- `index.ts` - Arquivo de exportações
- `INSTALACAO.md` - Este arquivo

## 🚀 Como Testar

### Opção 1: Adicionar à Rota (Recomendado)

Adicione esta rota ao seu `app.routes.ts` ou arquivo de rotas:

```typescript
{
  path: 'offcanvas-test',
  loadComponent: () => 
    import('./shared/components/offcanvas-container/offcanvas-test-page.component')
      .then(m => m.OffcanvasTestPageComponent)
}
```

Depois acesse: `http://localhost:4200/offcanvas-test`

### Opção 2: Usar em Qualquer Componente

```typescript
import { Component, inject } from '@angular/core';
import { OffcanvasService } from './shared/services/offcanvas.service';
import { ExampleOffcanvasContentComponent } from './shared/components/offcanvas-container/example-offcanvas-content.component';

@Component({
  // seu componente
})
export class MeuComponent {
  private offcanvasService = inject(OffcanvasService);
  private injector = inject(Injector);

  abrirOffcanvas() {
    this.offcanvasService.open(
      ExampleOffcanvasContentComponent,
      {
        title: 'Meu Offcanvas',
        idOrigem: 'TESTE001',
        contextState: 'teste-context'
      },
      this.injector,
      'offcanvas-class-90'
    );
  }
}
```

## 📋 Checklist de Verificação

- [x] ng-bootstrap instalado (✅ já estava no package.json)
- [x] Serviços criados
- [x] Componentes criados
- [x] Estilos aplicados
- [x] Documentação criada
- [x] Exemplos funcionais

## 🎯 Próximos Passos

1. **Teste o sistema** usando uma das opções acima
2. **Crie seus próprios componentes** para usar no offcanvas
3. **Adapte os estilos** conforme necessário
4. **Integre com seu sistema de estado** (stateProvider)

## 🔧 Personalização

### Criar Novo Componente para Offcanvas

```typescript
import { Component, Input } from '@angular/core';
import { NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { OffcanvasService } from '../../services/offcanvas.service';

@Component({
  selector: 'app-meu-offcanvas',
  standalone: true,
  template: `
    <div>
      <h4>{{ title }}</h4>
      <!-- Seu conteúdo aqui -->
    </div>
  `
})
export class MeuOffcanvasComponent {
  @Input() title?: string;
  @Input() idOrigem?: string;
  @Input() contextState?: string;
  
  private offcanvasRef?: NgbOffcanvasRef;
  private offcanvasService?: OffcanvasService;

  onOffcanvasInit(offcanvasRef: NgbOffcanvasRef, offcanvasService: OffcanvasService) {
    this.offcanvasRef = offcanvasRef;
    this.offcanvasService = offcanvasService;
  }
}
```

### Usar o Novo Componente

```typescript
this.offcanvasService.open(
  MeuOffcanvasComponent,
  {
    title: 'Título Personalizado',
    idOrigem: 'ID123',
    contextState: 'meu-context',
    // outros dados...
  },
  this.injector,
  'offcanvas-class-85'
);
```

## 🐛 Solução de Problemas

### Erro: "Cannot find module"
- Verifique se todos os imports estão corretos
- Certifique-se de que os componentes são standalone

### Offcanvas não abre
- Verifique se o ng-bootstrap está importado
- Confirme se os dados estão sendo passados corretamente

### Estilos não aplicados
- Verifique se o arquivo SCSS foi incluído no styles.scss
- Confirme se as classes CSS estão sendo aplicadas

## 📞 Suporte

Se encontrar problemas:
1. Verifique a documentação no README.md
2. Confira os exemplos nos arquivos de teste
3. Analise o console do navegador para erros

## 🎉 Pronto!

O sistema está implementado e pronto para uso. Siga o padrão da sua implementação original:

- **Injector** injeta no componente raiz
- **Nome/título** sempre definido
- **ContextState** como child do contexto pai  
- **IdOrigem** para alimentar o componente

Boa codificação! 🚀