import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClaimsComponent } from './claims/claims.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'claims', component: ClaimsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
