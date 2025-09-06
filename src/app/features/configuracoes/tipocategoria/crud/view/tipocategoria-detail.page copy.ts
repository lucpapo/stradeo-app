import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TipoCategoriaService } from '@stradeo/services/tipocategoria.service';
import { switchMap, of } from 'rxjs';
import { TipoCategoria } from '@stradeo/domain/models/tipocategoria.model';
import { ToastService } from '@pcode/toast/toast.service';
 

@Component({
  standalone: true,
  selector: 'app-tipocategoria-form',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './tipocategoria-detail.page.html',
  providers: [DatePipe]
})
export class TipocategoriaDetailPage implements OnInit {

   private toast = inject(ToastService);
  // --- Injeção de Dependências ---
  private readonly service = inject(TipoCategoriaService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly datePipe = inject(DatePipe);

  // --- Sinais de Estado ---
  loading = signal(false);
  error = signal<string | null>(null);
  auditOpen = signal(false);

  id = signal<number | null>(null);
  mode = signal<'create' | 'view' | 'edit'>('create');

  isViewMode = computed(() => this.mode() === 'view');

  // --- Formulário Reativo ---
  // O formulário agora inclui todos os campos. Os campos de auditoria
  // são criados com o estado 'disabled' para serem apenas de leitura.
  form: FormGroup = this.fb.group({
    id: [{ value: null, disabled: true }],
    descricao: ['', [Validators.required, Validators.maxLength(100)]],
    status_delecao: [0, Validators.required],
    data_cadastro: [{ value: '', disabled: true }],
    usuario_cadastro: [{ value: '', disabled: true }],
    data_atualizacao: [{ value: '', disabled: true }],
    usuario_atualizacao: [{ value: '', disabled: true }],
  });

ok() {
    this.toast.success('Operação realizada com sucesso!', {
      title: 'Tudo certo',
      position: 'top-end',
      delay: 14000,
    });
  }

  warn() {
    this.toast.warning('Campos pendentes para revisão.', {
      position: 'top-end',
      autohide: false, // fica até fechar manualmente
    });
  }

  err() {
    const id = this.toast.danger('Falha ao salvar o registro.', {
      title: 'Erro',
      position: 'top-end',
      delay: 28000,
    });

    // exemplo: fechar programaticamente antes do autohide
    setTimeout(() => this.toast.close(id), 13000);
  }

   fecharTodos() {
    this.toast.closeAll();
  }

  

  ngOnInit(): void {
    this.ok();
    this.warn();
    this.err();
    this.route.paramMap.pipe(
      switchMap(params => {
        const idParam = params.get('id');
        const urlSegments = this.route.snapshot.url;
        const isView = urlSegments.some(seg => seg.path === 'view');

        if (idParam && idParam !== 'novo') {
          const numericId = Number(idParam);
          this.id.set(numericId);
          this.mode.set(isView ? 'view' : 'edit');
          return this.service.get<TipoCategoria>(numericId);
        } else {
          this.mode.set('create');
          return of(null);
        }
      })
    ).subscribe({
      next: (data) => {
        if (data) {
          // Formata as datas para uma melhor apresentação antes de preencher o formulário
          const formattedData = {
            ...data,
            data_cadastro: this.datePipe.transform(data.data_cadastro, 'dd/MM/yyyy HH:mm:ss'),
            data_atualizacao: this.datePipe.transform(data.data_atualizacao, 'dd/MM/yyyy HH:mm:ss')
          };
          this.form.patchValue(formattedData);
          if (this.isViewMode()) {
            this.form.disable();
          }
        }
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set(`Erro ao carregar dados: ${err.message}`);
        this.loading.set(false);
      }
    });
  }
 
 
 
 

  limparPayloadParaAPI<T>(payload: T): Partial<T> {

    console.log(  this.mode() )
  const camposExcluir = ['data_atualizacao', 'data_cadastro', 'usuario_atualizacao', 'usuario_atualizacao', 'usuario_cadastro']; // Lista fixa de campos a remover
  const novoPayload: any = { ...payload }; // Cria uma cópia

  camposExcluir.forEach(campo => {
    if (campo in novoPayload) {
      delete novoPayload[campo];
    }
  });

  return novoPayload;
}

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.error.set(null);

    const formValue =  this.form.getRawValue();
    const payloadLimpo = this.limparPayloadParaAPI(formValue);
    const currentId = this.id();

    const saveOperation = this.mode() === 'create'
      ? this.service.create(payloadLimpo)
      : this.service.update(currentId!, payloadLimpo);

    saveOperation.subscribe({
      next: () => this.router.navigate(['/configuracoes/tipocategoria']),
      error: (err: HttpErrorResponse) => {
        this.error.set(`Erro ao salvar: ${err.message}`);
        this.loading.set(false);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/configuracoes/tipocategoria']);
  }

  switchToEditMode(): void {
    const currentId = this.id();
    if (currentId) {
      this.router.navigate(['/configuracoes/tipocategoria', currentId, 'edit']);
    }
  }

  toggleAudit() {
    this.auditOpen.set(!this.auditOpen());
  }


 
}

