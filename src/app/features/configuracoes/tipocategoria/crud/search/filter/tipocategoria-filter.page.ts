import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

export type TipocategoriaFilterValue = {
  descricao: string;
  status_delecao: '' | '0' | '1';
};

@Component({
  standalone: true,
  selector: 'app-tipocategoria-filter',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tipocategoria-filter.page.html',
  styleUrls: ['./tipocategoria-filter.page.scss'],
 
 
})
 
export class TipocategoriaFilterPage {
  private readonly fb = inject(FormBuilder);

  // 👇 NÃO use genérico aqui. Use nonNullable.group para não ter null.
  form = this.fb.nonNullable.group({
    descricao: '',
    status_delecao: '' as '' | '0' | '1',
  });

  @Input() set value(v: Partial<TipocategoriaFilterValue> | null) {
    if (v) {
      this.form.patchValue({
        descricao: v.descricao ?? '',
        status_delecao: (v.status_delecao ?? '') as '' | '0' | '1',
      }, { emitEvent: false });
    }
  }

  @Output() apply = new EventEmitter<TipocategoriaFilterValue>();
  @Output() clear = new EventEmitter<void>();

  onApply() {
    // 👇 getRawValue() devolve o VALUE (string, 'A'|'I'…), não os controles.
    this.apply.emit(this.form.getRawValue());
    
  }

  onClear() {
    this.form.reset({ descricao: '', status_delecao: '' }, { emitEvent: false });
    this.clear.emit();
  }
}
