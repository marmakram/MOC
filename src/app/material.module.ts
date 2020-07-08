import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule, MatButtonModule } from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatNativeDateModule} from '@angular/material';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  imports: [
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    MatNativeDateModule, 
    MatMomentDateModule,
    MatAutocompleteModule,
  ],
  exports: [
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    MatNativeDateModule, 
    MatMomentDateModule,
    MatAutocompleteModule,
  ]
})
export class MaterialModule { }
