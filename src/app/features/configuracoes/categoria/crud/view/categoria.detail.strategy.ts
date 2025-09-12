import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Validators } from '@angular/forms';
// PCODE
import { AbstractDetailStrategy } from '@pcode/ui/base-detail';
import { ToastService } from '@pcode/toast/toast.service';
// DYNAMIC IMPORTS
import { Categoria } from '@stradeo/domain/models/categoria.model';
import { CategoriaService } from '@stradeo/services/categoria.service';
/**
Estratégia específica para detalhes de Categoria
Implementa as regras de negócio específicas desta entidade.
*/
export class CategoriaDetailStrategy extends AbstractDetailStrategy<Categoria, number> {
private readonly datePipe = inject(DatePipe);
private readonly toastService = inject(ToastService);
// Desabilita o toast padrão da classe base para permitir mensagens customizadas.
public readonly showDefaultSuccessToast = false;
constructor(
readonly service: CategoriaService,
readonly router: Router
) {
super();
}
/**
Define os controles do formulário reativo com base nas colunas da tabela.
*/
createFormControls(entity?: Categoria): { [key: string]: any } {
return {
id: [{ value: entity?.id || null, disabled: true }],
concessao_id: [entity?.concessao_id ?? '', [Validators.required]],
descricao: [entity?.descricao ?? '', [Validators.required]],
numero_eixos: [entity?.numero_eixos ?? '', [Validators.required]],
tipo_categoria_id: [entity?.tipo_categoria_id ?? '', [Validators.required]],
codigo_tarifa_basica: [entity?.codigo_tarifa_basica ?? '', [Validators.required]],
codigo_categoria_adm: [entity?.codigo_categoria_adm ?? '', [Validators.required]],
codigo_poder_concedente: [entity?.codigo_poder_concedente ?? '', [Validators.required]],
considera_trafego: [entity?.considera_trafego ?? '', [Validators.required]],
ordem: [entity?.ordem ?? '', [Validators.required]],
tipo: [entity?.tipo ?? '', [Validators.required]],
maximo_eixos_suspenso: [entity?.maximo_eixos_suspenso ?? '', [Validators.required]],
eixos_equivalentes: [entity?.eixos_equivalentes ?? '', [Validators.required]],
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
shellKey: 'ui-CategoriaShellComponent',
detailKey: 'CategoriaDetailPage#main'
};
}
/**
Retorna a rota base para navegação.
*/
getBaseRoute(): string {
return '/configuracoes/categoria';
}
/**
Processa os dados após serem carregados da API, formatando campos de data.
*/
override processLoadedData(data: Categoria): Categoria {
if (!data) return data;
return {
  ...data,
  data_cadastro:  data.data_cadastro,
  data_atualizacao:   data.data_atualizacao
};
}
/**
Retorna os rótulos dos campos para serem usados em mensagens de validação.
*/
getFieldLabels(): { [key: string]: string } {
return {
id: 'Id',
concessao_id: 'Concessao_id',
descricao: 'Descricao',
numero_eixos: 'Numero_eixos',
tipo_categoria_id: 'Tipo_categoria_id',
codigo_tarifa_basica: 'Codigo_tarifa_basica',
codigo_categoria_adm: 'Codigo_categoria_adm',
codigo_poder_concedente: 'Codigo_poder_concedente',
considera_trafego: 'Considera_trafego',
ordem: 'Ordem',
tipo: 'Tipo',
maximo_eixos_suspenso: 'Maximo_eixos_suspenso',
eixos_equivalentes: 'Eixos_equivalentes',
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
return 'Categoria';
}
}