import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentLayoutComponent } from './components/content-layout/content-layout.component';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material/angular-material.module';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ContentLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule
  ]
})
export class SharedModule { }
