import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BoardModule } from './components/board/board.module';
import { DisplayModule } from './components/display/displa.module';
import { KeyboardModule } from './components/keyboard/keyboard.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BoardModule, DisplayModule, KeyboardModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
