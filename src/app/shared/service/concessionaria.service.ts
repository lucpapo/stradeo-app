import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Concessionaria {
  id: number;
  nome: string;
  cnpj: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConcessionariaService {
  private concessionariaAtualSubject = new BehaviorSubject<Concessionaria>({
    id: 1,
    nome: 'Concessionária XPTO',
    cnpj: '12.345.678/0001-90'
  });

  public concessionariaAtual$ = this.concessionariaAtualSubject.asObservable();

  private concessionarias: Concessionaria[] = [
    { id: 1, nome: 'Concessionária XPTO', cnpj: '12.345.678/0001-90' },
    { id: 2, nome: 'Concessionária ABC Motors', cnpj: '98.765.432/0001-10' },
    { id: 3, nome: 'Concessionária Premium Auto', cnpj: '11.222.333/0001-44' },
    { id: 4, nome: 'Concessionária Elite Veículos', cnpj: '55.666.777/0001-88' },
    { id: 5, nome: 'Concessionária Super Car', cnpj: '99.888.777/0001-66' },
    { id: 6, nome: 'Concessionária Mega Auto', cnpj: '44.333.222/0001-11' },
    { id: 7, nome: 'Concessionária Top Motors', cnpj: '77.888.999/0001-33' },
    { id: 8, nome: 'Concessionária Ultra Car', cnpj: '22.111.000/0001-55' }
  ];

  getConcessionarias(): Observable<Concessionaria[]> {
    return new Observable(observer => {
      observer.next(this.concessionarias);
      observer.complete();
    });
  }

  setConcessionariaAtual(concessionaria: Concessionaria): void {
    this.concessionariaAtualSubject.next(concessionaria);
  }

  getConcessionariaAtual(): Concessionaria {
    return this.concessionariaAtualSubject.value;
  }
}