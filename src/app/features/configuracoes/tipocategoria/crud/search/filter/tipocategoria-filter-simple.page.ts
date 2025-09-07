import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export type TipocategoriaFilterValue = {
    descricao: string;
    status_delecao: '' | '0' | '1';
};

@Component({
    standalone: true,
    selector: 'app-tipocategoria-filter-simple',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './tipocategoria-filter-simple.page.html',
    styleUrls: ['./tipocategoria-filter.page.scss'],
})
export class TipocategoriaFilterSimplePage implements OnInit, OnChanges {

    private readonly fb = inject(FormBuilder);

    @Input() value: TipocategoriaFilterValue = { descricao: '', status_delecao: '0' };
    @Output() apply = new EventEmitter<TipocategoriaFilterValue>();
    @Output() clear = new EventEmitter<void>();

    form!: FormGroup;

    ngOnInit(): void {
        this.createForm();
        this.updateFormWithValue();
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
        this.clear.emit();
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