import { Component } from '@angular/core';
// import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import * as L from 'leaflet';
import { ServiceService } from '../service.service';
import { MarkerService } from '../marker.service';
import { ModalController } from '@ionic/angular';
import { DetailPage } from '../detail/detail.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public map: L.map;

  public marker: any;
  public dpoint: any;
  public locateLyr: any;
  public dengueLyr: any;
  public dengueLst: any;
  public dengueSum: any;

  public markerIcon: any;

  public droneIcon: any;

  constructor(
    public service: ServiceService,
    public markerService: MarkerService,
    public modalCtrl: ModalController
  ) { }

  ionViewDidEnter() {
    this.loadMap();
    this.droneIcon = this.markerService.droneIcon;
  }

  loadMap() {
    this.map = L.map('map', { zoomControl: false }).setView([16.7421394, 100.19199189999999], 13);

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

    this.dengueLyr = L.layerGroup().addTo(this.map);
    this.locateLyr = L.layerGroup().addTo(this.map);

    L.control.layers({
      // "Google Map": googlemap.addTo(this.map),
      "OSM": osm.addTo(this.map),
      "Thaichote": theosWmts,
      // "Google Hybrid": satellite
    }, {
        // 'หมู่บ้านที่เกิดไข้เลือดออก': dengue.addTo(this.map),
        'ขอบเขตจังหวัด': pro.addTo(this.map),
        'ขอบเขตอำเภอ': amp.addTo(this.map),
        'ขอบเขตตำบล': tam.addTo(this.map),
      })

    this.getDengue(17.00, 100, 5000);
    // this.service.calLocation().subscribe((res: any) => {
    //   this.getDengue(res.coords.latitude, res.coords.longitude, 5000);

    //   this.service.setLocation(res);
    // });

  }

  async getDengue(lat: any, lon: any, buff: any) {
    this.map.eachLayer((lyr: any) => {
      if (lyr.options.iconName === 'now' || lyr.options.iconName === 'dengue') {
        this.map.removeLayer(lyr);
      }
    });

    await this.service.getDengue(lat, lon, buff).then((res: any) => {

      // nowlocation
      this.dengueLst = res.features;
      this.dengueSum = this.dengueLst.length;
      const latlng = [lat, lon];
      // console.log(latlng);
      if (this.dengueSum > 0) {
        this.markerIcon = this.markerService.redIcon;
      } else {
        this.markerIcon = this.markerService.greenIcon;
      }
      const iconNow = L.icon({
        iconUrl: this.markerIcon, //'../../assets/imgs/marker.png',
        iconSize: [32, 32],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
      });
      this.marker = L.marker(latlng, {
        icon: iconNow,
        iconName: 'now'
      }).addTo(this.map);
      this.map.setView(latlng, 14);
      this.locateLyr.addLayer(this.marker);

      // house dengue
      const houseIcon = L.icon({
        iconUrl: this.markerService.hourseIcon,
        iconSize: [32, 37],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
      });
      const marker = L.geoJSON(res, {
        pointToLayer: (feature: any, latlon: any) => {
          return L.marker(latlon, {
            icon: houseIcon,
            iconName: 'dengue'
          });
        },
        onEachFeature: (feature: any, layer: any) => {
          if (feature.properties) {
            layer.bindPopup(
              'ชื่อ: ' + feature.properties.vill_nam_t + '</br>'
            );
          }
        }
      });
      this.dengueLyr.addLayer(marker);
    });
  }

  async gotoDetail(d: any) {
    const modal = await this.modalCtrl.create({
      component: DetailPage,
      componentProps: {
        data: d
      }
    });
    // modal.onDidDismiss((res: any) => {
    //   console.log(res);
    //   if (res) {
    //     this.map.setView([res.y1, res.x1], 17);
    //   }
    // })
    return await modal.present();
  }

}
