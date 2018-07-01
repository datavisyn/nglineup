import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LineUpModule } from 'nglineup';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LineUpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
