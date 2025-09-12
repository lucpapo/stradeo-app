import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Validators } from '@angular/forms';
// PCODE
import { AbstractDetailStrategy } from '@pcode/ui/base-detail';
import { ToastService } from '@pcode/toast/toast.service';
// DYNAMIC IMPORTS
import { CategoriaEspecial } from '@stradeo/domain/models/categoriaespecial.model';
import { CategoriaEspecialService } from '@stradeo/services/categoriaespecial.service';
/**
Estratégia específica para detalhes de CategoriaEspecial
Implementa as regras de negócio específicas desta entidade.
*/
export class CategoriaEspecialDetailStrategy extends AbstractDetailStrategy<CategoriaEspecial, number> {
  private readonly datePipe = inject(DatePipe);
  private readonly toastService = inject(ToastService);
  // Desabilita o toast padrão da classe base para permitir mensagens customizadas.
  public readonly showDefaultSuccessToast = false;
  constructor(
    readonly service: CategoriaEspecialService,
    readonly router: Router
  ) {
    super();
  }
  /**
  Define os controles do formulário reativo com base nas colunas da tabela.
  */
  createFormControls(entity?: CategoriaEspecial): { [key: string]: any } {
    return {
      id: [{ value: entity?.id || null, disabled: true }],
      categoria_id: [entity?.categoria_id ?? '', [Validators.required]],
      quantidade_eixos: [entity?.quantidade_eixos ?? '', [Validators.required]],
      categoria_adm: [entity?.categoria_adm ?? '', [Validators.required]]
    };
  }
  /**
  Retorna as chaves do StateProvider para a entidade.
  */
  getStateKeys(): { shellKey: string; detailKey: string; } {
    return {
      shellKey: 'ui-CategoriaShellComponent',
      detailKey: 'CategoriaEspecialDetailPage#main'
    };
  }
  /**
  Retorna a rota base para navegação.
  */
  getBaseRoute(): string {
    return '/configuracoes/categoriaespecial';
  }
  /**
  Processa os dados após serem carregados da API, formatando campos de data.
  */
  override processLoadedData(data: CategoriaEspecial): CategoriaEspecial {
    if (!data) return data;
    return {
      ...data,
    };
  }
  /**
  Retorna os rótulos dos campos para serem usados em mensagens de validação.
  */
  getFieldLabels(): { [key: string]: string } {
    return {
      id: 'Id',
      categoria_id: 'Categoria_id',
      quantidade_eixos: 'Quantidade_eixos',
      categoria_adm: 'Categoria_adm'
    };
  }
  /**
  Retorna o título humanizado da entidade para ser usado em toasts e mensagens.
  */
  getEntityTitle(): string {
    return 'CategoriaEspecial';
  }
}