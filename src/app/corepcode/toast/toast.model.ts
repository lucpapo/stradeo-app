export type ToastType = 'default' | 'success' | 'info' | 'warning' | 'danger';
export type ToastPosition =
  | 'top-end' | 'top-start' | 'top-center'
  | 'bottom-end' | 'bottom-start' | 'bottom-center';

export interface ToastItem {
  id: string;
  message: string;
  title?: string;
  type: ToastType;
  position: ToastPosition;

  autohide: boolean;   // fecha sozinho
  delay: number;       // ms (tempo total)
  remaining: number;   // ms (tempo restante p/ autohide)
  paused: boolean;     // pausado por hover

  dismissible: boolean;
  createdAt: number;   // timestamp p/ "time ago"
}
