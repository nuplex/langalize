import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UnsolvedComponent } from './unsolved/unsolved.component';
import { SolvedComponent } from './solved/solved.component';
import { AddComponent } from './add/add.component';
import { WordService} from './word.service'
import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    UnsolvedComponent,
    SolvedComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    routing,
    HttpModule,
  ],
  providers: [
    WordService
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
