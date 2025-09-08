import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Concessionaria } from '../../../corestradeo/services/concessao.service';
import { CommonSvgIconsComponent } from '../header/common-svg-icons/common-svg-icons.component';
import { ConcessionariaStateService, ConcessionariaState } from './concessionaria-state.service';

@Component({
  selector: 'app-concessionaria-selector',
  standalone: true,
  imports: [CommonModule, CommonSvgIconsComponent],
  templateUrl: './concessionaria-selector.component.html',
  styleUrl: './concessionaria-selector.component.scss'
})
export class ConcessionariaSelectorComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter<void>();
  @Output() select = new EventEmitter<ConcessionariaState>();

  isOpen: boolean = false;
  concessionarias: Concessionaria[] = [];
  concessionariaAtual: ConcessionariaState | null = null;

  constructor(private concessionariaStateService: ConcessionariaStateService) {}

  ngOnInit(): void {
    this.loadConcessionarias();
    
    // Subscribe to concessionaria changes from state service
    this.concessionariaStateService.concessionaria$.subscribe(
      (concessionaria: ConcessionariaState | null) => this.concessionariaAtual = concessionaria
    );
  }

  private blockBodyScroll(): void {
    document.body.style.overflow = 'hidden';
  }

  private unblockBodyScroll(): void {
    document.body.style.overflow = '';
  }

  loadConcessionarias(): void {
    this.concessionariaStateService.getConcessionarias().subscribe(
      (concessionarias: Concessionaria[]) => this.concessionarias = concessionarias
    );
  }

  onSelectConcessionaria(concessionaria: Concessionaria): void {
    const concessionariaState: ConcessionariaState = {
      id: concessionaria.id,
      nome: concessionaria.nome,
      cnpj: concessionaria.cnpj
    };
    
    console.log('🎯 Selecionando concessionária:', concessionariaState);
    this.concessionariaStateService.setConcessionaria(concessionariaState);
    this.select.emit(concessionariaState);
    this.onClose();
  }

  openSelector(): void {
    this.isOpen = true;
    this.blockBodyScroll();
  }

  onClose(): void {
    this.isOpen = false;
    this.unblockBodyScroll();
    this.close.emit();
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  ngOnDestroy(): void {
    this.unblockBodyScroll();
  }
}