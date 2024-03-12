import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainboardModule } from './components/mainboard/mainboard.module';
import { StartPageModule } from './components/startpage/startpage.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainboardModule,
    RouterOutlet,
    StartPageModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
