import { Validators } from '@angular/forms';
// PCODE
import { AbstractFilterStrategy } from '@pcode/ui/base-filter';
// STRADEO
import { TipocategoriaFilterValue, TIPOCATEGORIA_FILTER_INITIAL_VALUE } from '@stradeo/domain/types/tipocategoria-filter.types';

/**
 * Estratégia específica para filtros de Tipo Categoria Sem Rota
 * Herda comportamentos comuns da classe abstrata e implementa apenas a lógica específica
 */
export class TipocategoriaSRFilterStrategy extends AbstractFilterStrategy<TipocategoriaFilterValue> {

    /**
     * Valor inicial padrão para Tipo Categoria Sem Rota
     */
    protected readonly initialValue = TIPOCATEGORIA_FILTER_INITIAL_VALUE;

    /**
     * Define os controles do formulário específicos para Tipo Categoria Sem Rota
     */
    createFormControls(savedData?: TipocategoriaFilterValue): { [key: string]: any } {
        const data = savedData || this.initialValue;

        return {
            descricao: [data.descricao, [Validators.required, Validators.maxLength(100)]],
            status_delecao: [data.status_delecao]
        };
    }

    /**
     * Labels dos campos para o ValidationIndicator
     */
    getFieldLabels(): { [key: string]: string } {
        return {
            descricao: 'Descrição',
            status_delecao: 'Status'
        };
    }
}