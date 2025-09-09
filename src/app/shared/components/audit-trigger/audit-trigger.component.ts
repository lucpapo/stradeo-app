import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-audit-trigger',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audit-trigger.component.html',
  styleUrls: ['./audit-trigger.component.scss']
})
export class AuditTriggerComponent {
  @Input() lastUpdateDate?: string | Date;
  @Output() openAudit = new EventEmitter<void>();

  onOpenAudit(): void {
    this.openAudit.emit();
  }
}