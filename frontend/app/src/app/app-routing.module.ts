import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


@NgModule({
  imports: [RouterModule.forRoot([
    {path:'',children:
    [{ path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    }],}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
