import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, signal } from '@angular/core';

export interface AuditData {
  dataCadastro?: string | Date;
  usuarioCadastro?: string;
  dataAtualizacao?: string | Date;
  usuarioAtualizacao?: string;
}

@Component({
  selector: 'app-audit-canvas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audit-canvas.component.html',
  styleUrls: ['./audit-canvas.component.scss']
})
export class AuditCanvasComponent {
  @Input() auditData: AuditData | null = null;
  @Input() isOpen = false;
  @Output() closeCanvas = new EventEmitter<void>();

  onClose(): void {
    this.closeCanvas.emit();
  }

  onBackdropClick(): void {
    this.onClose();
  }
}