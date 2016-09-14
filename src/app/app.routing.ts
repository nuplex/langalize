import { Routes, RouterModule } from '@angular/router';

import {UnsolvedComponent} from './unsolved/unsolved.component';
import {SolvedComponent} from './solved/solved.component';
import {AddComponent} from './add/add.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/add',
    pathMatch: 'full'
  },
  {
    path:'unsolved',
    component: UnsolvedComponent
  },
  {
    path:'solved',
    component: SolvedComponent
  },
  {
    path:'add',
    component: AddComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes);
