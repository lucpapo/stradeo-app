import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DetailStrategy } from './detail-strategy.interface';
import { StateProvider } from '@pcode/store/state-provider';
import { inject } from '@angular/core';
import { StateRef } from '@pcode/store/state-ref';

/**
 * Classe abstrata que implementa a lógica comum para estratégias de detalhes
 * Reduz duplicação de código e padroniza comportamentos
 */
export abstract class AbstractDetailStrategy<TEntity extends Record<string, any>, TKey>
    implements DetailStrategy<TEntity, TKey> {


  protected readonly stateProvider = inject(StateProvider);
   

    /**
     * Define os controles do formulário específicos para esta entidade
     * Deve ser implementado pela classe filha
     */
    abstract createFormControls(entity?: TEntity): { [key: string]: any };

    /**
     * Retorna as chaves do StateProvider para esta entidade
     * Deve ser implementado pela classe filha
     */
    abstract getStateKeys(): {
        shellKey: string;
        detailKey: string;
    };

    /**
     * Retorna a rota base para navegação
     * Deve ser implementado pela classe filha
     */
    abstract getBaseRoute(): string;

    /**
     * Carrega uma entidade pelo ID
     * Implementação padrão que chama service.get(id)
     * Requer que a strategy tenha propriedade service com método get()
     */
    loadEntity(id: TKey): Observable<TEntity> {
        const strategy = this as any;
        return strategy.service.get(id);
    }

    /**
     * Cria uma nova entidade
     * Implementação padrão que chama service.create(payload)
     * Requer que a strategy tenha propriedade service com método create()
     */
    createEntity(payload: Partial<TEntity>): Observable<TEntity> {
        const strategy = this as any;
        return strategy.service.create(payload);
    }

    /**
     * Atualiza uma entidade existente
     * Implementação padrão que chama service.update(id, payload)
     * Requer que a strategy tenha propriedade service com método update()
     */
    updateEntity(id: TKey, payload: Partial<TEntity>): Observable<TEntity> {
        const strategy = this as any;
        return strategy.service.update(id, payload);
    }

    /**
     * Prepara o payload antes de enviar para a API
     * Implementação padrão que remove campos de auditoria
     * Pode ser sobrescrita se necessário
     */
    preparePayload(payload: any): Partial<TEntity> {
        const {
            data_cadastro,
            data_atualizacao,
            usuario_cadastro,
            usuario_atualizacao,
            ...cleanPayload
        } = payload;
        return cleanPayload;
    }

    /**
     * Processa os dados após carregar da API
     * Implementação padrão que formata datas de auditoria
     * Pode ser sobrescrita se necessário
     */
    processLoadedData(data: TEntity): TEntity {
        if (!data) return data;

        // Injeta DatePipe se disponível na strategy
        const strategy = this as any;
        if (strategy.datePipe) {
            return {
                ...data,
                data_cadastro: strategy.datePipe.transform(data['data_cadastro'], 'dd/MM/yyyy HH:mm:ss'),
                data_atualizacao: strategy.datePipe.transform(data['data_atualizacao'], 'dd/MM/yyyy HH:mm:ss')
            };
        }

        return data;
    }

    /**
     * Validação customizada do formulário
     * Implementação padrão que usa a validação do Angular
     * Pode ser sobrescrita se necessário
     */
    validateForm(form: FormGroup): boolean {
        return form.valid;
    }

    /**
     * Determina o modo baseado na URL
     * Implementação padrão que verifica segmentos da URL
     * Pode ser sobrescrita se necessário
     */
    determineModeFromUrl(urlSegments: any[], idParam: string | null): 'create' | 'view' | 'edit' {
        const isView = urlSegments.some(seg => seg.path === 'view');

        if (idParam && idParam !== 'novo') {
            return isView ? 'view' : 'edit';
        } else {
            return 'create';
        }
    }

    /**
     * Ações pós-salvamento
     * Implementação padrão vazia
     * Pode ser sobrescrita se necessário
     */
    afterSave(savedEntity: TEntity, mode: 'create' | 'edit'): void {
        // Implementação opcional na classe filha
    }

    /**
     * Navega para a lista
     * Usa getBaseRoute() para determinar a rota
     */
    navigateToList(): void {
        const strategy = this as any;
        strategy.router.navigate([this.getBaseRoute()]);
    }

    /**
     * Navega para edição de um item
     * Usa getBaseRoute() para determinar a rota
     */
    navigateToEdit(id: TKey): void {
        const strategy = this as any;
        strategy.router.navigate([this.getBaseRoute(), id, 'edit']);
    }

    /**
     * Navega para visualização de um item
     * Usa getBaseRoute() para determinar a rota
     */
    navigateToView(id: TKey): void {
        const strategy = this as any;
        strategy.router.navigate([this.getBaseRoute(), id, 'view']);
    }

     /**
     * Implementação base para buscar a entidade a partir do StateProvider.
     */
    getEntityFromState(sourceKey: string, shellKey: string): TEntity | null {
        try {
            // Agora usamos a propriedade 'this.stateProvider' que já foi injetada.
            const listStateRef = new StateRef<{ selected: { selectedItem: TEntity | null } }>(
                this.stateProvider,
                shellKey,
                sourceKey
            );
            return listStateRef.get()?.selected?.selectedItem || null;
        } catch (error) {
            console.error(`[AbstractDetailStrategy] Erro ao ler 'selectedItem' do estado:`, error);
            return null;
        }
    }

    /**
     * Implementação base para determinar o modo a partir do StateProvider.
     */
    getModeFromState(sourceKey: string, shellKey: string): 'view' | 'edit' | null {
        try {
            // E aqui também usamos 'this.stateProvider'.
            const listStateRef = new StateRef<{ selected: { lastAction: 'view' | 'edit' | 'novo' | null } }>(
                this.stateProvider,
                shellKey,
                sourceKey
            );
            const action = listStateRef.get()?.selected?.lastAction;
            if (action === 'view') return 'view';
            if (action === 'edit') return 'edit';
            return null;
        } catch (error) {
            console.error(`[AbstractDetailStrategy] Erro ao ler 'lastAction' do estado:`, error);
            return null;
        }
    }
}       