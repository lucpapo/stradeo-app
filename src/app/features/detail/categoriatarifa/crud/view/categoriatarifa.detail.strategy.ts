import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Validators } from '@angular/forms';
// PCODE
import { AbstractDetailStrategy } from '@pcode/ui/base-detail';
import { ToastService } from '@pcode/toast/toast.service';
// DYNAMIC IMPORTS
import { CategoriaTarifa } from '@stradeo/domain/models/categoriatarifa.model';
import { CategoriaTarifaService } from '@stradeo/services/categoriatarifa.service';
/**
Estratégia específica para detalhes de CategoriaTarifa
Implementa as regras de negócio específicas desta entidade.
*/
export class CategoriaTarifaDetailStrategy extends AbstractDetailStrategy<CategoriaTarifa, number> {
private readonly datePipe = inject(DatePipe);
private readonly toastService = inject(ToastService);
// Desabilita o toast padrão da classe base para permitir mensagens customizadas.
public readonly showDefaultSuccessToast = false;
constructor(
readonly service: CategoriaTarifaService,
readonly router: Router
) {
super();
}
/**
Define os controles do formulário reativo com base nas colunas da tabela.
*/
createFormControls(entity?: CategoriaTarifa): { [key: string]: any } {
return {
id: [{ value: entity?.id || null, disabled: true }],
tarifa_id: [entity?.tarifa_id ?? '', [Validators.required]],
categoria_id: [entity?.categoria_id ?? '', [Validators.required]],
valor: [entity?.valor ?? '', [Validators.required]],
data_cadastro: [{ value: entity?.data_cadastro || '', disabled: true }, [Validators.required]],
usuario_cadastro: [{ value: entity?.usuario_cadastro || '', disabled: true }, [Validators.required]],
data_atualizacao: [{ value: entity?.data_atualizacao || '', disabled: true }, [Validators.required]],
usuario_atualizacao: [{ value: entity?.usuario_atualizacao || '', disabled: true }, [Validators.required]],
status_delecao: [entity?.status_delecao ?? 0, [Validators.required]]
};
}
/**
Retorna as chaves do StateProvider para a entidade.
*/
getStateKeys(): { shellKey: string; detailKey: string; } {
return {
shellKey: 'ui-CategoriaTarifaShellComponent',
detailKey: 'CategoriaTarifaDetailPage#main'
};
}
/**
Retorna a rota base para navegação.
*/
getBaseRoute(): string {
return '/configuracoes/categoriatarifa';
}
/**
Processa os dados após serem carregados da API, formatando campos de data.
*/
override processLoadedData(data: CategoriaTarifa): CategoriaTarifa {
if (!data) return data;
return {
  ...data,
  data_cadastro: this.datePipe.transform(data.data_cadastro, 'dd/MM/yyyy HH:mm:ss') || data.data_cadastro,
  data_atualizacao: this.datePipe.transform(data.data_atualizacao, 'dd/MM/yyyy HH:mm:ss') || data.data_atualizacao
};
}
/**
Retorna os rótulos dos campos para serem usados em mensagens de validação.
*/
getFieldLabels(): { [key: string]: string } {
return {
id: 'Id',
tarifa_id: 'Tarifa_id',
categoria_id: 'Categoria_id',
valor: 'Valor',
data_cadastro: 'Data_cadastro',
usuario_cadastro: 'Usuario_cadastro',
data_atualizacao: 'Data_atualizacao',
usuario_atualizacao: 'Usuario_atualizacao',
status_delecao: 'Status_delecao'
};
}
/**
Retorna o título humanizado da entidade para ser usado em toasts e mensagens.
*/
getEntityTitle(): string {
return 'CategoriaTarifa';
}
}