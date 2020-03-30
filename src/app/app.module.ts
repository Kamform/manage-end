import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {BootstrapComponent} from './pages/bootstrap/bootstrap.component';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {UserComponent} from './pages/user/user.component';
import {CategoryComponent} from './pages/category/category.component';
import {ResourceComponent} from './pages/resource/resource.component';
import {FileComponent} from './pages/file/file.component';
import {AdminComponent} from './pages/admin/admin.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableContentComponent} from './components/table-content/table-content.component';
import {CardComponent} from './components/card/card.component';
import {LoginComponent} from './pages/login/login.component';
import {AuthenticationGuard} from './guard/authentication.guard';

@NgModule({
  declarations: [
    BootstrapComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    CategoryComponent,
    ResourceComponent,
    FileComponent,
    TableContentComponent,
    CardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'admin-manage', component: AdminComponent, canActivate: [AuthenticationGuard]},
      {path: 'user-manage', component: UserComponent, canActivate: [AuthenticationGuard]},
      {path: 'category-manage', component: CategoryComponent, canActivate: [AuthenticationGuard]},
      {path: 'resource-manage', component: ResourceComponent, canActivate: [AuthenticationGuard]},
      {path: 'file-manage', component: FileComponent, canActivate: [AuthenticationGuard]},
      {path: 'login', component: LoginComponent},
    ]),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [BootstrapComponent]
})
export class AppModule {
}
