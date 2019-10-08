import { NavParams, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import * as L from 'leaflet';
import { MarkerService } from '../marker.service';

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

  public map: L.map;

  constructor(
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    public markerService: MarkerService
  ) {
  }

  ionViewDidEnter() {
    this.loadMap();
  }

  ngOnInit() {
  }

  loadMap() {
    this.map = L.map('map-order', { zoomControl: false }).setView([16.7421394, 100.19199189999999], 13);

    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    const satellite = L.tileLayer('http://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    const theosWmts = L.tileLayer(
      'http://go-tiles1.gistda.or.th/mapproxy/wmts/thaichote/GLOBAL_WEBMERCATOR/{z}/{x}/{y}.png', {
        minZoom: 0,
        maxZoom: 20,
        format: 'image/png',
        attribution: '&copy; <a href = "http://www.gistda.or.th">GISTDA</a>',
      });

    const googlemap = L.tileLayer('http://{s}.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    // overlay layers
    const cgiUrl = 'http://www.cgi.uru.ac.th/geoserver/ows?';

    const dengue = L.tileLayer.wms(cgiUrl, {
      layers: 'dengue:vill_dengue_2015',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
      // CQL_FILTER: 'pro_code=63 OR pro_code=64 OR pro_code=53 OR pro_code=67 OR pro_code=65 OR pro_code=64'
    });

    const pro = L.tileLayer.wms(cgiUrl, {
      layers: 'th:province_4326',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
      CQL_FILTER: 'pro_code=63 OR pro_code=64 OR pro_code=53 OR pro_code=67 OR pro_code=65 OR pro_code=64'
    });

    const amp = L.tileLayer.wms(cgiUrl, {
      layers: '	th:amphoe_4326',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
      CQL_FILTER: 'pro_code=63 OR pro_code=64 OR pro_code=53 OR pro_code=67 OR pro_code=65 OR pro_code=64'
    });

    const tam = L.tileLayer.wms(cgiUrl, {
      layers: 'th:tambon_4326',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
      CQL_FILTER: 'pro_code=63 OR pro_code=64 OR pro_code=53 OR pro_code=67 OR pro_code=65 OR pro_code=64'
    });

    L.control.layers({
      // "Google Map": googlemap.addTo(this.map),
      'OSM': osm.addTo(this.map),
      'Thaichote': theosWmts,
      // "Google Hybrid": satellite
    }, {
        // 'หมู่บ้านที่เกิดไข้เลือดออก': dengue.addTo(this.map),
        'ขอบเขตจังหวัด': pro.addTo(this.map),
        'ขอบเขตอำเภอ': amp.addTo(this.map),
        'ขอบเขตตำบล': tam.addTo(this.map),
      });

    // this.getDengue(17.00, 100, 5000);
    // this.service.calLocation().subscribe((res: any) => {
    //   this.getDengue(res.coords.latitude, res.coords.longitude, 5000);

    //   this.service.setLocation(res);
    // });

    const markerIcon = this.markerService.redIcon;

    this.map.on('click', (e: any) => {
      this.map.eachLayer((lyr: any) => {
        if (lyr.options.iconName === 'now' || lyr.options.iconName === 'dengue') {
          this.map.removeLayer(lyr);
        }
      });

      const iconNow = L.icon({
        iconUrl: markerIcon, //'../../assets/imgs/marker.png',
        iconSize: [32, 32],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
      });
      const marker = L.marker(e.latlng, {
        icon: iconNow,
        iconName: 'now'
      }).addTo(this.map);


      // console.log(e);
      // const newMarker = new L.marker(e.latlng).addTo(this.map);
    });



  }




  closeModal() {
    this.modalCtrl.dismiss();
  }

}

