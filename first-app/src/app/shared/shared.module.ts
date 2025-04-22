import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { HighlightDirective } from './directives/highlight.directive';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ClickOutsideDirective,
    HighlightDirective,
    CapitalizePipe,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    ClickOutsideDirective,
    HighlightDirective,
    CapitalizePipe,
    TruncatePipe
  ]
})
export class SharedModule {}