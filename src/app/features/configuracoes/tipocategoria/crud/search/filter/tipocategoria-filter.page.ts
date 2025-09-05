import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms'; // 1. Importar Validators
import { BaseFiltroDirective, ConfiguracaoFormulario } from '@pcode/ui/filter/BaseFiltroDirective';
 
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
export class TipocategoriaFilterPage extends BaseFiltroDirective<TipocategoriaFilterValue> {
  
  /**
   * Implementa o método abstrato da classe base.
   * Aqui definimos a estrutura completa do formulário, incluindo valores
   * iniciais e validadores para cada campo.
   */
  protected criarConfiguracaoFormulario(): ConfiguracaoFormulario<TipocategoriaFilterValue> {
    return {
      // 2. Para este campo, adicionamos um validador 'required'.
      // A sintaxe é: [valorInicial, validadorOuArrayDeValidadores]
     descricao: ['', []], //[Validators.required, Validators.maxLength(20)]],

      // 3. Para este campo, definimos apenas o valor inicial, sem validadores.
      status_delecao: '0',
    };
  }
}

