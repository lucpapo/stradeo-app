import { InjectionToken } from '@angular/core';
import { CrudStrategy } from './crud-strategy';
 

export const CRUD_STRATEGY = new InjectionToken<CrudStrategy<any>>('CRUD_STRATEGY');