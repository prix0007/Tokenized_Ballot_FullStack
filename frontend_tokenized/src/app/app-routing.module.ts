import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClaimsComponent } from './claims/claims.component';
import { ContractsComponent } from './contracts/contracts.component';
import { UsersComponent } from './users/users.component';
import { CreateUserComponent } from './users/create.component';
import { CreateClaimComponent } from './claims/create.component';
import { WalletComponent } from './wallet/wallet.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'claims', component: ClaimsComponent },
  { path: 'create-claim', component: CreateClaimComponent },
  { path: 'contracts', component: ContractsComponent },
  { path: 'wallet', component: WalletComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
