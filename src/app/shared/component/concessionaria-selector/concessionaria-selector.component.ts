import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Concessionaria, ConcessionariaService } from '../../service/concessionaria.service';
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

  constructor(private concessionariaService: ConcessionariaService) {}

  ngOnInit(): void {
    this.loadConcessionarias();
    this.updateConcessionariaAtual();
    
    // Subscribe to concessionaria changes
    this.concessionariaService.concessionariaAtual$.subscribe(
      concessionaria => this.concessionariaAtual = concessionaria
    );
  }

  private blockBodyScroll(): void {
    document.body.style.overflow = 'hidden';
  }

  private unblockBodyScroll(): void {
    document.body.style.overflow = '';
  }

  private updateConcessionariaAtual(): void {
    this.concessionariaAtual = this.concessionariaService.getConcessionariaAtual();
  }

  loadConcessionarias(): void {
    this.concessionariaService.getConcessionarias().subscribe(
      concessionarias => this.concessionarias = concessionarias
    );
  }

  onSelectConcessionaria(concessionaria: Concessionaria): void {
    this.concessionariaService.setConcessionariaAtual(concessionaria);
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