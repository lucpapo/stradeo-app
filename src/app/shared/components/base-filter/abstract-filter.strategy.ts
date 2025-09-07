import { FormGroup, Validators } from '@angular/forms';
import { FilterStrategy } from './filter-strategy.interface';

/**
 * Classe abstrata que implementa a lógica comum para estratégias de filtro
 * Reduz duplicação de código e padroniza comportamentos
 */
export abstract class AbstractFilterStrategy<T> implements FilterStrategy<T> {

  /**
   * Valor inicial padrão - deve ser definido pela classe filha
   */
  protected abstract readonly initialValue: T;

  /**
   * Define os controles do formulário específicos para esta entidade
   * Deve ser implementado pela classe filha
   */
  abstract createFormControls(savedData?: T): { [key: string]: any };

  /**
   * Retorna os labels dos campos para o ValidationIndicator
   * Deve ser implementado pela classe filha
   */
  abstract getFieldLabels(): { [key: string]: string };

  /**
   * Define campos obrigatórios para pesquisa (opcional)
   * Se definido, pelo menos um desses campos deve ter conteúdo válido
   */
  protected getRequiredSearchFields?(): string[];

  /**
   * Verifica se o formulário tem dados válidos para pesquisar
   * Implementação padrão inteligente:
   * 1. Detecta automaticamente campos obrigatórios pelos validators do formulário
   * 2. Se há campos obrigatórios, verifica se pelo menos um tem conteúdo válido
   * 3. Caso contrário, verifica se há diferença do valor inicial
   * Pode ser sobrescrita se necessário
   */
  hasValidSearchData(formValue: any): boolean {
    // Primeiro verifica se há campos obrigatórios definidos manualmente (para compatibilidade)
    const manualRequiredFields = this.getRequiredSearchFields?.();
    
    if (manualRequiredFields && manualRequiredFields.length > 0) {
      return this.hasAnyValidContent(formValue, manualRequiredFields);
    }

    // Detecta automaticamente campos obrigatórios pelos validators
    const autoRequiredFields = this.getRequiredFieldsFromValidators();
    
    if (autoRequiredFields.length > 0) {
      return this.hasAnyValidContent(formValue, autoRequiredFields);
    }
    
    // Se não há campos obrigatórios, verifica se algo mudou do valor inicial
    return !this.isInitialValue(formValue);
  }

  /**
   * Retorna o valor inicial padrão para esta entidade
   */
  getInitialValue(): T {
    return this.initialValue;
  }

  /**
   * Verifica se o valor é igual aos valores iniciais
   * Implementação padrão usando JSON.stringify para comparação profunda
   * Pode ser sobrescrita se necessário
   */
  isInitialValue(value: T): boolean {
    return JSON.stringify(value) === JSON.stringify(this.initialValue);
  }

  /**
   * Validação customizada específica (implementação padrão)
   * Usa a validação padrão do Angular
   * Pode ser sobrescrita se necessário
   */
  validateForm(form: FormGroup): boolean {
    return form.valid;
  }

  /**
   * Transformação de dados antes de aplicar o filtro (implementação padrão)
   * Aplica trim em todas as propriedades string
   * Pode ser sobrescrita se necessário
   */
  transformData(data: T): T {
    if (!data || typeof data !== 'object') {
      return data;
    }

    const transformed = { ...data };
    
    // Aplica trim em todas as propriedades string
    Object.keys(transformed).forEach(key => {
      const value = (transformed as any)[key];
      if (typeof value === 'string') {
        (transformed as any)[key] = value.trim();
      }
    });

    return transformed;
  }

  /**
   * Método utilitário para criar validadores comuns
   * Pode ser usado pelas classes filhas
   */
  protected createStringValidators(maxLength?: number, required = false) {
    const validators = [];
    
    if (required) {
      validators.push(Validators.required);
    }
    
    if (maxLength) {
      validators.push(Validators.maxLength(maxLength));
    }

    return validators;
  }

  /**
   * Método utilitário para verificar se uma string tem conteúdo válido
   * Pode ser usado pelas classes filhas
   */
  protected hasValidStringContent(value: string): boolean {
    return value?.trim() !== '';
  }

  /**
   * Método utilitário para verificar se pelo menos um campo tem conteúdo
   * Pode ser usado pelas classes filhas
   */
  protected hasAnyValidContent(formValue: any, fields: string[]): boolean {
    return fields.some(field => {
      const value = formValue[field];
      if (typeof value === 'string') {
        return this.hasValidStringContent(value);
      }
      return value !== null && value !== undefined && value !== '';
    });
  }

  /**
   * Detecta automaticamente campos obrigatórios baseado nos validators do formulário
   * Analisa os validators definidos no createFormControls para identificar campos required
   */
  private getRequiredFieldsFromValidators(): string[] {
    try {
      const formControls = this.createFormControls();
      const requiredFields: string[] = [];

      Object.keys(formControls).forEach(fieldName => {
        const controlConfig = formControls[fieldName];
        
        // Verifica se é um array com validators [value, validators]
        if (Array.isArray(controlConfig) && controlConfig.length >= 2) {
          const validators = controlConfig[1];
          
          // Verifica se validators é um array e contém Validators.required
          if (Array.isArray(validators) && validators.includes(Validators.required)) {
            requiredFields.push(fieldName);
          }
        }
      });

      return requiredFields;
    } catch (error) {
      console.warn('Erro ao detectar campos obrigatórios automaticamente:', error);
      return [];
    }
  }
}