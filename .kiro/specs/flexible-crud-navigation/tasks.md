# Implementation Plan

- [ ] 1. Create configuration interfaces and types
  - Define NavigationConfig, GridConfig, ListConfig, and NavigationEvent interfaces
  - Create TipocategoriaState interface for state management
  - Add type definitions for component modes and navigation events
  - _Requirements: 4.1, 4.2, 5.2_

- [ ] 2. Create TipocategoriaContainer component
  - Generate new Angular component with proper selector and template structure
  - Implement input properties for navigationMode, initialData, and gridConfig
  - Implement output events for navigationChange and dataChange
  - Add basic view switching logic between list and detail views
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 3. Implement container navigation state management
  - Add currentView, selectedItem, and detailMode properties to container
  - Implement onViewItem, onEditItem, onDeleteItem event handlers
  - Create navigation logic for embedded mode (non-route based)
  - Add state management for switching between list and detail views
  - _Requirements: 4.2, 4.3, 4.4_

- [ ] 4. Enhance TipocategoriaListPage for dual mode support
  - Add @Input properties: data, config, gridMode for embedded mode support
  - Add @Output events: viewItem, editItem, deleteItem, createItem, gridSave
  - Modify component logic to work with both route-based and embedded data sources
  - Preserve existing route-based functionality while adding embedded mode support
  - _Requirements: 2.1, 2.2, 2.3, 6.1, 6.2_

- [ ] 5. Implement grid editing functionality in list component
  - Add inline editing capabilities to the data grid/table
  - Implement save and cancel actions within grid interface
  - Add validation logic for in-grid editing
  - Create grid-specific event handlers and state management
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 6. Enhance TipocategoriaDetailPage for dual mode support
  - Add @Input properties: item, mode, embeddedMode for embedded usage
  - Add @Output events: save, cancel, back for parent communication
  - Modify component to accept data via inputs instead of only route parameters
  - Preserve existing route-based functionality while adding embedded mode support
  - _Requirements: 2.1, 2.2, 2.4, 6.1, 6.2_

- [ ] 7. Implement embedded mode data flow in detail component
  - Add logic to handle item data from input properties
  - Implement save event emission for parent component notification
  - Add cancel and back event handlers for embedded navigation
  - Create form validation that works in both route and embedded modes
  - _Requirements: 2.2, 2.4, 4.3, 5.3_

- [ ] 8. Create container component template and integration
  - Implement conditional rendering of list and detail components based on currentView
  - Wire up event handlers between container and child components
  - Add proper data binding for inputs and outputs
  - Implement navigation flow coordination between components
  - _Requirements: 4.1, 4.3, 4.4, 5.1_

- [ ] 9. Add configuration-based behavior switching
  - Implement logic to switch between route, embedded, and grid modes based on navigationMode input
  - Add conditional logic for different navigation behaviors
  - Create configuration validation and default value handling
  - Implement mode-specific initialization logic
  - _Requirements: 4.1, 4.2, 5.2, 5.4_

- [ ] 10. Create comprehensive unit tests for container component
  - Write tests for all navigation modes (route, embedded, grid)
  - Test event emission and input handling
  - Mock child components and test integration
  - Verify state management and navigation flow
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 11. Create unit tests for enhanced list component
  - Test dual mode functionality (route vs embedded)
  - Test grid editing capabilities and validation
  - Test event emissions for all CRUD operations
  - Verify backward compatibility with existing route-based usage
  - _Requirements: 2.1, 2.2, 3.1, 3.2, 6.1_

- [ ] 12. Create unit tests for enhanced detail component
  - Test embedded mode data handling and event emissions
  - Test form validation in both route and embedded modes
  - Test save, cancel, and back functionality
  - Verify backward compatibility with existing implementations
  - _Requirements: 2.1, 2.2, 4.3, 6.1, 6.2_

- [ ] 13. Create integration tests for complete navigation flows
  - Test end-to-end navigation in embedded mode
  - Test data flow between container and child components
  - Test grid editing complete workflow
  - Verify component reusability in different contexts
  - _Requirements: 2.3, 2.4, 3.4, 5.1, 5.4_

- [ ] 14. Add TypeScript module exports and component registration
  - Export all new interfaces and components from appropriate modules
  - Register TipocategoriaContainer in Angular module declarations
  - Update existing module exports to include enhanced components
  - Ensure proper dependency injection and service registration
  - _Requirements: 5.1, 5.4, 6.3_

- [ ] 15. Create example usage implementations
  - Create example of route-based usage (existing pattern)
  - Create example of embedded container usage
  - Create example of grid editing implementation
  - Write code examples showing component reusability patterns
  - _Requirements: 5.1, 5.4, 6.3_