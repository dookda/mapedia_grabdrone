import { NavParams, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  todo = {
    title: '',
    description: ''
  };

  customAlertOptions: any = {
    header: 'Pizza Toppings',
    subHeader: 'Select your toppings',
    message: '$1.00 per topping',
    translucent: true
  };

  customPopoverOptions: any = {
    header: 'Hair Color',
    subHeader: 'Select your hair color',
    message: 'Only select your dominant hair color'
  };

  customActionSheetOptions: any = {
    header: 'Colors',
    subHeader: 'Select your favorite color'
  };

  constructor(
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public formBuilder: FormBuilder
  ) {
    // this.todo = this.formBuilder.group({
    //   title: ['', Validators.required],
    //   description: ['']
    // });
  }

  ngOnInit() {
  }

  // login(form){
  //   this.authService.login(form.value).subscribe((res)=>{
  //     this.router.navigateByUrl('home');
  //   });
  // }




  closeModal() {
    this.modalCtrl.dismiss();
  }

}

