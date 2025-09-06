import { Directive, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeyInput } from '@pcode/api';
import { IGerenciadorLista } from './IGerenciadorLista';
import { IServiceBase } from '@pcode/api/IServiceBase';
import { GerenciadorListaSignal } from './GerenciadorListaSignal';

// Importações da nossa arquitetura
 

@Directive()
export abstract class BaseListaPage<
  TRow extends { id: TKey },
  TFilter extends object,
  TKey extends KeyInput
> implements OnInit {

  protected readonly router = inject(Router);

  // Usamos a asserção de atribuição definitiva (!) porque garantimos que será
  // inicializado em ngOnInit antes de ser usado pelo template.
  public gerenciador!: IGerenciadorLista<TRow, TFilter, TKey>;

  constructor() {
    // O construtor é mantido vazio.
    // Inicializar o 'gerenciador' aqui causaria o erro, porque as dependências
    // do componente filho (como o serviço) ainda não foram injetadas.
  }

  // --- Contrato para a Classe Filha ---
  protected abstract obterServico(): IServiceBase<TRow, TFilter, TKey>;
  protected abstract obterEstadoInicialQuery(): { page: number; pageSize: number; filters: TFilter };

  // --- Ciclo de Vida ---
  ngOnInit(): void {
    // Inicializamos o gestor aqui, dentro de ngOnInit.
    // Neste ponto do ciclo de vida do componente, a injeção de dependência foi concluída
    // para o componente filho, então `obterServico()` retornará uma instância de serviço válida.
    this.gerenciador = new GerenciadorListaSignal<TRow, TFilter, TKey>(
      this.obterServico(),
      this.obterEstadoInicialQuery()
    );

    // Após o gestor ser criado com um serviço válido, podemos acionar o carregamento inicial dos dados.
    this.gerenciador.load();
  }
}

