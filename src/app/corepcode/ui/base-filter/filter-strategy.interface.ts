import { FormGroup } from '@angular/forms';

/**
 * Interface para estratégias de filtro específicas
 * Define os métodos que cada filtro deve implementar
 */
export interface FilterStrategy<T> {
  /**
   * Define os controles do formulário específicos para esta entidade
   */
  createFormControls(savedData?: T): { [key: string]: any };

  /**
   * Retorna os labels dos campos para o ValidationIndicator
   */
  getFieldLabels(): { [key: string]: string };

  /**
   * Retorna o valor inicial padrão para esta entidade
   */
  getInitialValue(): T;

  /**
   * Validação customizada específica (opcional)
   */
  validateForm?(form: FormGroup): boolean;

  /**
   * Transformação de dados antes de aplicar o filtro (opcional)
   */
  transformData?(data: T): T;

  /**
   * Verifica se o valor é igual aos valores iniciais
   */
  isInitialValue(value: T): boolean;

  /**
   * Verifica se o formulário tem dados válidos para pesquisar
   */
  hasValidSearchData(formValue: any): boolean;
   /**
   * ADICIONAR ESTA PROPRIEDADE OPCIONAL
   * Se true (padrão), permite que a BaseFilterPage enriqueça o payload do filtro
   * com dados de estado globais (ex: concessionária).
   * Defina como false na sua strategy para desabilitar este comportamento.
   */
  enableGlobalEnrichment?: boolean;
}