import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CreateCharacterComponent } from '../create-character/create-character.component';

@NgModule({
  declarations: [
    CreateCharacterComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: '', component: CreateCharacterComponent }
    ]),
    FormsModule,
    CommonModule
  ]
})
export class CreateCharacterModule {}
