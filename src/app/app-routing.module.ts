import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NavBarComponent} from './component/nav-bar/nav-bar.component'
import { AddDrugComponent } from '././component/Drugs/add-drug/add-drug.component' ;
import { SignupComponent } from './component/signup/signup.component';
import {ShowDrugComponent} from './component/Drugs/show-drug/show-drug.component'
import {EditDrugComponent} from './component/Drugs/edit-drug/edit-drug.component'
import { from } from 'rxjs';
import { ShowCategoriesComponent } from './component/Category/show-categories/show-categories.component';
import { AddSubCategoryComponent } from './component/SubCategory/add-sub-category/add-sub-category.component';
// import { AddCategoryComponent } from './component/Category/add-category/add-category.component';
import {AdminComponent} from './component/admin/admin.component'
// import {fir} from './component/firm/firm.component'
import { AuthGuard } from './guards/auth.guard';
import {FirmComponent} from '../app/component/Firm/firm/firm.component'
import {HomeComponent} from './component/home/home.component'
// import {RrComponent} from './component/form/form.component'
import {FormComponent} from '../app/component/form/form.component'
import {AddOrderComponent} from '../app/component/Order/add-order/add-order.component'
import{EmployeeComponent} from './component/Employee/emplyee/employee.component'

import { AllUserComponent } from './component/Users/all-user/all-user.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  // { path: '**', redirectTo: 'login'},
  { path: 'login', component:  SignupComponent},

  { path: 'navbar', component:  NavBarComponent,children:[
  ]},
  // { path: 'addorder', component: AddOrderComponent },

  { path: 'home', component: HomeComponent ,children:[
    { path: 'addorder', component: AddOrderComponent },
    { path: 'navbar', component:  NavBarComponent},
    { path: 'showdrug/adddrug', component: AddDrugComponent },
    { path: 'showdrug', component: ShowDrugComponent, canActivate: [AuthGuard] },
    { path: 'edit/:empID', component: EditDrugComponent },
    { path: 'showCategories', component: ShowCategoriesComponent },
    // { path: 'adddrug', component: ShowCategoriesComponent },
    { path: 'ADDSUBCATEGORY', component: AddSubCategoryComponent },
    { path: 'showSubCategories', component: AddSubCategoryComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'firm', component: FirmComponent },
    { path: 'form', component: FormComponent },  
    { path: 'employee', component: EmployeeComponent },  
    { path: 'allusers', component: AllUserComponent },  

    // { path: 'addOrder', component: AddOrderComponent },  
  ]}


  // { path: 'showSubCategories', component:  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

