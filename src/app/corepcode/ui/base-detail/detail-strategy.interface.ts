import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

/**
 * Interface para estratégias de detalhes específicas
 * Define os métodos que cada estratégia de detalhes deve implementar
 */
export interface DetailStrategy<TEntity extends Record<string, any>, TKey> {
  /**
   * Define os controles do formulário específicos para esta entidade
   */
  createFormControls(entity?: TEntity): { [key: string]: any };

  /**
   * Retorna as chaves do StateProvider para esta entidade
   */
  getStateKeys(): {
    shellKey: string;
    detailKey: string;
  };

  /**
   * Retorna a rota base para navegação
   */
  getBaseRoute(): string;

  /**
   * Carrega uma entidade pelo ID
   */
  loadEntity(id: TKey): Observable<TEntity>;

  /**
   * Cria uma nova entidade
   */
  createEntity(payload: Partial<TEntity>): Observable<TEntity>;

  /**
   * Atualiza uma entidade existente
   */
  updateEntity(id: TKey, payload: Partial<TEntity>): Observable<TEntity>;

  /**
   * Prepara o payload antes de enviar para a API (opcional)
   * Remove campos de auditoria, aplica transformações, etc.
   */
  preparePayload?(payload: any): Partial<TEntity>;

  /**
   * Processa os dados após carregar da API (opcional)
   * Formata datas, aplica transformações, etc.
   */
  processLoadedData?(data: TEntity): TEntity;

  /**
   * Validação customizada do formulário (opcional)
   */
  validateForm?(form: FormGroup): boolean;

  /**
   * Determina o modo baseado na URL (opcional)
   * Permite customizar a lógica de detecção de modo
   */
  determineModeFromUrl?(urlSegments: any[], idParam: string | null): 'create' | 'view' | 'edit';

  /**
   * Ações pós-salvamento (opcional)
   * Permite customizar o que acontece após salvar
   */
  afterSave?(savedEntity: TEntity, mode: 'create' | 'edit'): void;

  /**
   * Navega para a lista
   */
  navigateToList(): void;

  /**
   * Navega para edição de um item
   */
  navigateToEdit(id: TKey): void;

  /**
   * Navega para visualização de um item
   */
  navigateToView(id: TKey): void;
}