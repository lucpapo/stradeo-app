import { Routes } from '@angular/router';
import { KnowledgeBaseComponent } from './knowledgeBase.component';

export default  [
  {
    path : '',
    component : KnowledgeBaseComponent,
    data : {
      title : 'Knowledgebase',
      breadcrumb : "Knowledgebase"
    }
  }
] as Routes; 
