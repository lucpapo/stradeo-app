import { Validators } from '@angular/forms';
import { AbstractFilterStrategy } from '../abstract-filter.strategy';

// Exemplo de tipo para demonstração
interface ExampleFilterValue {
  nome: string;
  codigo: string;
  ativo: boolean;
}

const EXAMPLE_FILTER_INITIAL_VALUE: ExampleFilterValue = {
  nome: '',
  codigo: '',
  ativo: true
};

/**
 * Exemplo de como usar a AbstractFilterStrategy
 * Demonstra como criar uma nova estratégia de filtro com mínimo código
 */
export class ExampleFilterStrategy extends AbstractFilterStrategy<ExampleFilterValue> {

  /**
   * Valor inicial padrão - obrigatório
   */
  protected readonly initialValue = EXAMPLE_FILTER_INITIAL_VALUE;

  /**
   * Define os controles do formulário - obrigatório
   */
  createFormControls(savedData?: ExampleFilterValue): { [key: string]: any } {
    const data = savedData || this.initialValue;

    return {
      nome: [data.nome, this.createStringValidators(50, true)], // Usando método utilitário
      codigo: [data.codigo, [Validators.maxLength(20)]],
      ativo: [data.ativo]
    };
  }

  /**
   * Labels dos campos - obrigatório
   */
  getFieldLabels(): { [key: string]: string } {
    return {
      nome: 'Nome',
      codigo: 'Código',
      ativo: 'Ativo'
    };
  }

  /**
   * OPÇÃO 1: Definir campos obrigatórios (recomendado)
   * A validação será feita automaticamente pela classe abstrata
   */
  protected getRequiredSearchFields(): string[] {
    return ['nome', 'codigo']; // Pelo menos um desses deve ter conteúdo
  }

  // OPÇÃO 2: Sobrescrever hasValidSearchData se precisar de lógica customizada
  // hasValidSearchData(formValue: any): boolean {
  //   return this.hasValidStringContent(formValue.nome) || 
  //          formValue.ativo === false; // Exemplo de lógica específica
  // }

  // OPÇÃO 3: Usar implementação padrão (não definir nada)
  // Vai verificar se há diferença do valor inicial

  // Todos os outros métodos são herdados da classe abstrata!
  // - getInitialValue()
  // - isInitialValue()
  // - validateForm()
  // - transformData()
  // - hasValidSearchData() (implementação inteligente)
}