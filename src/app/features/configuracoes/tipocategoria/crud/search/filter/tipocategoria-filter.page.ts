import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class TipocategoriaFilterPage extends BaseFiltroDirective<TipocategoriaFilterValue> implements OnInit {

  constructor() {
    super();
  }


  protected criarConfiguracaoFormulario(): ConfiguracaoFormulario<TipocategoriaFilterValue> {
    return {
      descricao: ['', [Validators.required, Validators.maxLength(20)]],
      status_delecao: '0',
    };
  }

  protected obterValorInicial(): TipocategoriaFilterValue {
    return {
      descricao: '',
      status_delecao: '0'
    };
  }


}

