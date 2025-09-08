import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, BehaviorSubject } from 'rxjs';
import { BaseService } from '../../corepcode/api/base.service';
import { Concessao, ConcessaoCombo } from '../domain/models/concessao.model';
import { ConcessaoFilterValue } from '../domain/types/concessao-filter.types';
import { environment } from '../../../environments/environment';

export interface Concessionaria {
  id: number;
  nome: string;
  cnpj: string;
}

export interface ConcessaoInicializacao {
  concessionariaId?: number;
  filtrosIniciais?: ConcessaoFilterValue;
  dadosPreCarregados?: Partial<Concessao>;
}

@Injectable({
  providedIn: 'root',
})
export class ConcessaoService extends BaseService<
  Concessao,
  ConcessaoFilterValue,
  number
> {
  private concessionariaAtualSubject = new BehaviorSubject<Concessionaria>({} as Concessionaria);
  public concessionariaAtual$ = this.concessionariaAtualSubject.asObservable();

  constructor() {
    const http = inject(HttpClient);
    super(http, `${environment.apiBase}/Concessao`);
    this.inicializarConcessionariaAtual();
  }

  private inicializarConcessionariaAtual(): void {
    this.getConcessionarias().subscribe(concessionarias => {
      if (concessionarias.length > 0) {
        this.setConcessionariaAtual(concessionarias[0]);
      }
    });
  }

  /**
   * Endpoint combo não tipado para preencher dropdowns/selectors
   * Retorna dados dinâmicos sem tipagem específica
   */
  getCombo(): Observable<any[]> {
    return this.http.get<any>(`${environment.apiBase}/Concessao/combo`).pipe(
      map((response: any) => response.dados || [])
    );
  }

  /**
   * Endpoint combo tipado para quando precisar de type safety
   */
  getComboTyped(): Observable<ConcessaoCombo[]> {
    return this.http.get<any>(`${environment.apiBase}/Concessao/combo`).pipe(
      map((response: any) => response.dados || [])
    );
  }

  /**
   * Retorna concessionárias formatadas para uso na aplicação
   */
  getConcessionarias(): Observable<Concessionaria[]> {
    return this.getCombo().pipe(
      map(dados => dados.map(item => ({
        id: item.id,
        nome: item.nome,
        cnpj: item.cnpj_concessao || ''
      })))
    );
  }

  setConcessionariaAtual(concessionaria: Concessionaria): void {
    this.concessionariaAtualSubject.next(concessionaria);
  }

  getConcessionariaAtual(): Concessionaria {
    return this.concessionariaAtualSubject.value;
  }

  /**
   * Inicializa o serviço com dados específicos
   * Útil para quando a tela precisa começar com dados pré-definidos
   */
  inicializarComDados(dados: ConcessaoInicializacao): void {
    if (dados.concessionariaId) {
      this.getConcessionarias().subscribe(concessionarias => {
        const concessionaria = concessionarias.find(c => c.id === dados.concessionariaId);
        if (concessionaria) {
          this.setConcessionariaAtual(concessionaria);
        }
      });
    }
  }

  /**
   * Reseta o serviço para o estado inicial padrão
   */
  resetarParaEstadoInicial(): void {
    this.inicializarConcessionariaAtual();
  }
}