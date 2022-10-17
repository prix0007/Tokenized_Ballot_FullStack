import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ClaimsComponent } from './claims/claims.component';
import { ContractsComponent } from './contracts/contracts.component';
import { UsersComponent } from './users/users.component';
import { CreateUserComponent } from './users/create.component';
import { CreateClaimComponent } from './claims/create.component';
import { WalletComponent } from './wallet/wallet.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClaimsComponent,
    ContractsComponent,
    UsersComponent,
    CreateUserComponent,
    CreateClaimComponent,
    WalletComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
