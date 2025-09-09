import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';

export interface AuditData {
  dataCadastro?: string | Date;
  usuarioCadastro?: string;
  dataAtualizacao?: string | Date;
  usuarioAtualizacao?: string;
}

@Component({
  selector: 'app-audit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent {
  @Input() auditData: AuditData | null = null;
  @Input() lastUpdateDate?: string | Date;

  isOpen = signal(false);

  openAudit(): void {
    this.isOpen.set(true);
  }

  closeAudit(): void {
    this.isOpen.set(false);
  }

  onBackdropClick(): void {
    this.closeAudit();
  }
}