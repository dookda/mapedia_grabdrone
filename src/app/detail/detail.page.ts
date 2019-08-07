import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { OrderPage } from '../order/order.page';
import { ChatPage } from '../chat/chat.page';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  public provider: any;
  public data: any;

  public code: string;
  public lat: number;
  public lng: number;
  public list: any;
  public img: any;

  constructor(
    public navParams: NavParams,
    public modalCtrl: ModalController,

  ) { }

  ngOnInit() {
    this.data = this.navParams.get('data');
    // console.log(this.data);
    const fs = this.navParams.get('data');
    this.code = fs.properties.vill_nam_t;
    this.lat = fs.geometry.coordinates[1];
    this.lng = fs.geometry.coordinates[0];
    this.list = fs.properties.vill_code;
    this.img = './../../assets/img/avatar.jpeg';
  }

  async gotoOrder() {
    const modal = await this.modalCtrl.create({
      component: OrderPage,
      componentProps: {
        data: 'd'
      }
    });
    return await modal.present();
  }

  async gotoChat() {
    const modal = await this.modalCtrl.create({
      component: ChatPage,
      componentProps: {
        data: 'da'
      }
    });
    return await modal.present();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
