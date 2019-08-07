
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { MarkerService } from './marker.service';
import { ServiceService } from './service.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DetailPageModule } from './detail/detail.module';
import { ChatPageModule } from './chat/chat.module';
import { OrderPageModule } from './order/order.module';
import { ChatService } from './chat.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    DetailPageModule,
    ChatPageModule,
    OrderPageModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    Geolocation,
    ServiceService,
    MarkerService,
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
