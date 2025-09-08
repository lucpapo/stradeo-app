import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Concessionaria, ConcessionariaService } from '../../service/concessionaria.service';
import { CommonSvgIconsComponent } from '../header/common-svg-icons/common-svg-icons.component';

@Component({
  selector: 'app-concessionaria-selector',
  standalone: true,
  imports: [CommonModule, CommonSvgIconsComponent],
  templateUrl: './concessionaria-selector.component.html',
  styleUrl: './concessionaria-selector.component.scss'
})
export class ConcessionariaSelectorComponent implements OnInit, OnChanges, OnDestroy {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() select = new EventEmitter<Concessionaria>();

  concessionarias: Concessionaria[] = [];
  concessionariaAtual: Concessionaria | null = null;

  constructor(private concessionariaService: ConcessionariaService) {}

  ngOnInit(): void {
    this.loadConcessionarias();
    this.updateConcessionariaAtual();
  }

  ngOnChanges(): void {
    if (this.isOpen) {
      this.updateConcessionariaAtual();
      this.blockBodyScroll();
    } else {
      this.unblockBodyScroll();
    }
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

  onClose(): void {
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