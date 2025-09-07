import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StateRef } from '@pcode/store/state-ref';
import { StateProvider } from '@pcode/store/state-provider';
import { ValidationIndicatorComponent } from 'app/shared/components/validation-indicator/validation-indicator.component';

export type TipocategoriaFilterValue = {
    descricao: string;
    status_delecao: '' | '0' | '1';
};

@Component({
    standalone: true,
    selector: 'app-tipocategoria-filter-simple',
    imports: [CommonModule, ReactiveFormsModule, ValidationIndicatorComponent],
    templateUrl: './tipocategoria-filter-simple.page.html',
    styleUrls: ['./tipocategoria-filter.page.scss'],
})
export class TipocategoriaFilterSimplePage implements OnInit, OnChanges {

    private readonly fb = inject(FormBuilder);
    private readonly stateProvider = inject(StateProvider);

    @Input() value: TipocategoriaFilterValue = { descricao: '', status_delecao: '0' };
    @Output() apply = new EventEmitter<TipocategoriaFilterValue>();
    @Output() clear = new EventEmitter<void>();

    form!: FormGroup;
    
    // StateRef específico para os filtros
    private filterStateRef: StateRef<TipocategoriaFilterValue>;

    // Labels dos campos para o ValidationIndicator
    fieldLabels = {
        descricao: 'Descrição',
        status_delecao: 'Status'
    };

    constructor() {
        // StateRef específico para filtros
        this.filterStateRef = new StateRef<TipocategoriaFilterValue>(
            this.stateProvider,
            'ui-TipocategoriaShellComponent',
            'TipocategoriaFilterPage#main'
        );
    }

    ngOnInit(): void {
        this.createForm();
        this.loadSavedFilters();
    }

    /**
     * Cria o formulário
     */
    private createForm(): void {
        this.form = this.fb.group({
            descricao: ['', [Validators.required, Validators.maxLength(100)]],
            status_delecao: ['0']
        });
    }

    /**
     * Carrega os filtros salvos do estado ou usa valores iniciais
     */
    private loadSavedFilters(): void {
        const savedFilters = this.filterStateRef.get();
        
        if (savedFilters) {
            console.log('🔄 Filtros restaurados do estado:', savedFilters);
            this.form.patchValue(savedFilters);
            // Não emite automaticamente - deixa a lista buscar os filtros quando precisar
        } else if (this.value) {
            console.log('📝 Usando filtros do @Input:', this.value);
            this.form.patchValue(this.value);
        } else {
            console.log('🆕 Usando filtros iniciais padrão');
        }
    }

    /**
     * Atualiza o formulário com os valores recebidos via @Input
     */
    private updateFormWithValue(): void {
        if (this.value) {
            this.form.patchValue(this.value);
        }
    }

    /**
     * Detecta mudanças no @Input value
     */
    ngOnChanges(): void {
        if (this.form) {
            this.updateFormWithValue();
        }
    }

    /**
     * Aplica o filtro
     */
    onApply(): void {
        // Força a validação de todos os campos
        this.form.markAllAsTouched();
        
        if (this.form.valid) {
            const filterValue: TipocategoriaFilterValue = this.form.value;
            console.log('✅ Filtro válido - Aplicando:', filterValue);
            
            // Salva os filtros no estado
            this.saveFilters(filterValue);
            
            // Emite para a lista
            this.apply.emit(filterValue);
        } else {
            console.log('❌ Filtro inválido - Não aplicando:', this.form.errors);
            // Não emite o evento se o formulário for inválido
        }
    }

    /**
     * Limpa o filtro
     */
    onClear(): void {
        const initialValue: TipocategoriaFilterValue = { descricao: '', status_delecao: '0' };
        this.form.patchValue(initialValue);
        
        // Salva os filtros limpos no estado
        this.saveFilters(initialValue);
        
        this.clear.emit();
    }

    /**
     * Salva os filtros no estado
     */
    private saveFilters(filters: TipocategoriaFilterValue): void {
        console.log('💾 Salvando filtros no estado:', filters);
        this.filterStateRef.set(filters);
    }

    /**
     * Getters para facilitar o acesso no template
     */
    get descricaoControl() {
        return this.form.get('descricao');
    }

    get statusControl() {
        return this.form.get('status_delecao');
    }

    /**
     * Verifica se o formulário tem dados para pesquisar
     */
    /**
     * Verifica se o formulário tem dados válidos para pesquisar
     */
    get hasValidSearchData(): boolean {
        const formValue = this.form.value;
        return formValue.descricao?.trim() !== '';
    }
}