import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseFiltroDirective, ConfiguracaoFormulario } from '@pcode/ui/filter/BaseFiltroDirective';
import { ValidationConfig } from 'app/shared/validation/validation-config.interface';
import { ValidationIndicatorComponent } from 'app/shared/components/validation-indicator/validation-indicator.component';
import { ValidationService } from 'app/shared/validation/validation.service';


export type TipocategoriaFilterValue = {
  descricao: string;
  status_delecao: '' | '0' | '1';
};

@Component({
  standalone: true,
  selector: 'app-tipocategoria-filter',
  imports: [CommonModule, ReactiveFormsModule, ValidationIndicatorComponent],
  templateUrl: './tipocategoria-filter.page.html',
  styleUrls: ['./tipocategoria-filter.page.scss', '../../../../../../shared/styles/validation.scss'],
})
export class TipocategoriaFilterPage extends BaseFiltroDirective<TipocategoriaFilterValue> implements OnInit {

  protected override readonly validationService = inject(ValidationService);

  // Configuração de validação específica para este filtro
  protected override validationConfig: ValidationConfig = {
    descricao: [
      { field: 'descricao', validatorType: 'required', message: 'Este campo é obrigatório.' },
      { field: 'descricao', validatorType: 'maxlength', message: 'O campo não pode ter mais de 20 caracteres.' }
    ]
  };

  // Labels dos campos específicos para este filtro
  protected override fieldLabels = {
    descricao: 'Descrição',
    status_delecao: 'Status'
  };


  protected criarConfiguracaoFormulario(): ConfiguracaoFormulario<TipocategoriaFilterValue> {
    return {
      descricao: ['', [Validators.required, Validators.maxLength(20)]],
      status_delecao: '0',
    };
  }

  protected obterValorInicial(): TipocategoriaFilterValue {
    return {
      descricao: '', // Campo obrigatório vazio - deve ser inválido
      status_delecao: '0'
    };
  }


}

