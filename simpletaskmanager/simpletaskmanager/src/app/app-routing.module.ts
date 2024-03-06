import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainboardComponent } from './components/mainboard/mainboard.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { StartpageComponent } from './components/startpage/startpage.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  {
    path: 'app',
    component: StartpageComponent,
    children: [
      { path: 'tasks', component: MainboardComponent },
      {
        path: 'tasks/:id',
        component: MainboardComponent,
        canActivate: [authGuard],
      },
    ],
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}
