import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberOnlyDirective } from './directives/number-only.directive';

@NgModule({
  declarations: [NumberOnlyDirective],
  imports: [CommonModule],
  exports: [NumberOnlyDirective],
})
export class CoreModule {}
