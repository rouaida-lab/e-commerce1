import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
  imports: [RouterModule.forChild([
    {
        path:'auth',children:[
            {path:'register',component:RegisterComponent}
        ]
    }
  ])],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
