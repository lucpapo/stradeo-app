# Design Document

## Overview

The flexible CRUD navigation system will be implemented using a layered architecture that separates navigation concerns from business logic. The design introduces a container component that can operate in different modes (routed vs embedded) while maintaining the same underlying list and detail components.

## Architecture

### Component Hierarchy

```
TipocategoriaShellComponent (existing - route-based)
├── TipocategoriaListPage
└── TipocategoriaDetailPage

TipocategoriaContainer (new - flexible)
├── TipocategoriaListPage (reused)
└── TipocategoriaDetailPage (reused)
```

### Navigation Modes

1. **Route Mode**: Uses Angular Router for navigation (existing behavior)
2. **Embedded Mode**: Uses internal state management for navigation
3. **Grid Mode**: Specialized embedded mode with inline editing capabilities

## Components and Interfaces

### TipocategoriaContainer

**Purpose**: Central orchestrator that manages navigation state and mode switching.

**Interface**:
```typescript
@Component({
  selector: 'app-tipocategoria-container',
  template: `
    <app-tipocategoria-list 
      *ngIf="currentView === 'list'"
      [data]="listData"
      [config]="listConfig"
      (viewItem)="onViewItem($event)"
      (editItem)="onEditItem($event)"
      (deleteItem)="onDeleteItem($event)">
    </app-tipocategoria-list>
    
    <app-tipocategoria-detail
      *ngIf="currentView === 'detail'"
      [item]="selectedItem"
      [mode]="detailMode"
      (save)="onSave($event)"
      (cancel)="onCancel()"
      (back)="onBack()">
    </app-tipocategoria-detail>
  `
})
export class TipocategoriaContainer {
  @Input() navigationMode: 'route' | 'embedded' | 'grid' = 'embedded';
  @Input() initialData?: Tipocategoria[];
  @Input() gridConfig?: GridConfig;
  
  @Output() navigationChange = new EventEmitter<NavigationEvent>();
  @Output() dataChange = new EventEmitter<Tipocategoria[]>();
  
  currentView: 'list' | 'detail' = 'list';
  selectedItem?: Tipocategoria;
  detailMode: 'view' | 'edit' | 'create' = 'view';
}
```

### Enhanced TipocategoriaListPage

**Modifications**: Add support for embedded mode and grid editing.

**New Interface**:
```typescript
@Component({
  selector: 'app-tipocategoria-list'
})
export class TipocategoriaListPage {
  @Input() data?: Tipocategoria[]; // For embedded mode
  @Input() config?: ListConfig;
  @Input() gridMode: boolean = false;
  
  @Output() viewItem = new EventEmitter<Tipocategoria>();
  @Output() editItem = new EventEmitter<Tipocategoria>();
  @Output() deleteItem = new EventEmitter<Tipocategoria>();
  @Output() createItem = new EventEmitter<void>();
  @Output() gridSave = new EventEmitter<Tipocategoria>();
  
  // Existing route-based logic preserved
  // New embedded mode logic added
}
```

### Enhanced TipocategoriaDetailPage

**Modifications**: Support different invocation modes and parent communication.

**New Interface**:
```typescript
@Component({
  selector: 'app-tipocategoria-detail'
})
export class TipocategoriaDetailPage {
  @Input() item?: Tipocategoria; // For embedded mode
  @Input() mode: 'view' | 'edit' | 'create' = 'view';
  @Input() embeddedMode: boolean = false;
  
  @Output() save = new EventEmitter<Tipocategoria>();
  @Output() cancel = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  
  // Existing route-based logic preserved
  // New embedded mode logic added
}
```

## Data Models

### Configuration Interfaces

```typescript
interface NavigationConfig {
  mode: 'route' | 'embedded' | 'grid';
  routeBase?: string; // e.g., '/configuracoes/tipocategoria'
  gridOptions?: GridConfig;
}

interface GridConfig {
  inlineEdit: boolean;
  selectableRows: boolean;
  actions: GridAction[];
}

interface ListConfig {
  showFilters: boolean;
  showActions: boolean;
  pageSize: number;
  sortable: boolean;
}

interface NavigationEvent {
  type: 'navigate' | 'edit' | 'create' | 'delete';
  target: 'list' | 'detail';
  data?: any;
}
```

### State Management

```typescript
interface TipocategoriaState {
  currentView: 'list' | 'detail';
  selectedItem?: Tipocategoria;
  listData: Tipocategoria[];
  loading: boolean;
  error?: string;
}
```

## Error Handling

### Navigation Errors
- **Route Mode**: Leverage Angular Router error handling
- **Embedded Mode**: Emit error events to parent component
- **Grid Mode**: Show inline validation errors

### Data Errors
- Consistent error interface across all modes
- Parent component notification through events
- Graceful degradation for network issues

### Validation Errors
- Form-level validation for detail views
- Grid-level validation for inline editing
- Real-time validation feedback

## Testing Strategy

### Unit Testing
- Test each component in isolation
- Mock navigation dependencies
- Test both route and embedded modes
- Validate event emissions and input handling

### Integration Testing
- Test container component with different configurations
- Verify navigation flow in both modes
- Test data flow between parent and child components

### E2E Testing
- Test complete user workflows in route mode
- Test embedded component integration
- Test grid editing functionality
- Verify backward compatibility

### Component Testing
```typescript
describe('TipocategoriaContainer', () => {
  describe('Route Mode', () => {
    // Test traditional routing behavior
  });
  
  describe('Embedded Mode', () => {
    // Test programmatic navigation
  });
  
  describe('Grid Mode', () => {
    // Test inline editing
  });
});
```

## Implementation Approach

### Phase 1: Container Component
- Create TipocategoriaContainer with basic mode switching
- Implement embedded navigation state management
- Add configuration interfaces

### Phase 2: Component Enhancement
- Modify existing list and detail components for dual mode support
- Add input/output properties for embedded mode
- Preserve existing route-based functionality

### Phase 3: Grid Integration
- Implement inline editing capabilities
- Add grid-specific validation and save logic
- Create grid configuration options

### Phase 4: Integration & Testing
- Integrate all components
- Comprehensive testing across all modes
- Documentation and migration guide

## Backward Compatibility

The existing TipocategoriaShellComponent will remain unchanged and continue to work with the enhanced TipocategoriaListPage and TipocategoriaDetailPage components. The new functionality is additive and doesn't break existing route-based implementations.

## Migration Path

1. **Immediate**: New projects can use TipocategoriaContainer
2. **Gradual**: Existing implementations can migrate component by component
3. **Optional**: Route-based implementations can remain unchanged if desired