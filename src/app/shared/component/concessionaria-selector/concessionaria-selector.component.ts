import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Concessionaria, ConcessaoService } from '../../../corestradeo/services/concessao.service';
import { CommonSvgIconsComponent } from '../header/common-svg-icons/common-svg-icons.component';

@Component({
  selector: 'app-concessionaria-selector',
  standalone: true,
  imports: [CommonModule, CommonSvgIconsComponent],
  templateUrl: './concessionaria-selector.component.html',
  styleUrl: './concessionaria-selector.component.scss'
})
export class ConcessionariaSelectorComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter<void>();
  @Output() select = new EventEmitter<Concessionaria>();

  isOpen: boolean = false;
  concessionarias: Concessionaria[] = [];
  concessionariaAtual: Concessionaria | null = null;

  constructor(private concessaoService: ConcessaoService) {}

  ngOnInit(): void {
    this.loadConcessionarias();
    this.updateConcessionariaAtual();
    
    // Subscribe to concessionaria changes
    this.concessaoService.concessionariaAtual$.subscribe(
      (concessionaria: Concessionaria) => this.concessionariaAtual = concessionaria
    );
  }

  private blockBodyScroll(): void {
    document.body.style.overflow = 'hidden';
  }

  private unblockBodyScroll(): void {
    document.body.style.overflow = '';
  }

  private updateConcessionariaAtual(): void {
    this.concessionariaAtual = this.concessaoService.getConcessionariaAtual();
  }

  loadConcessionarias(): void {
    this.concessaoService.getConcessionarias().subscribe(
      (concessionarias: Concessionaria[]) => this.concessionarias = concessionarias
    );
  }

  onSelectConcessionaria(concessionaria: Concessionaria): void {
    this.concessaoService.setConcessionariaAtual(concessionaria);
    this.select.emit(concessionaria);
    this.onClose();
  }

  openSelector(): void {
    this.isOpen = true;
    this.updateConcessionariaAtual();
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