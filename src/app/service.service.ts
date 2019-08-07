import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  public location: any;

  constructor(
    public http: HttpClient,
    public geolocation: Geolocation
  ) { }

  getDengue(lat: any, lon: any, buff: any) {
    return new Promise((res, rej) => {
      const url = `http://cgi.uru.ac.th:3000/api/dengue/${lat}/${lon}/${buff}`;
      this.http.get(url).subscribe(data => {
        res(data);
      }, (err) => {
        rej(err);
      });
    });
  }

  getHospital(lat: any, lon: any, buff: any) {
    return new Promise((res, rej) => {
      const url = `http://cgi.uru.ac.th:3000/api/hospital/${lat}/${lon}/${buff}`;
      this.http.get(url).subscribe(data => {
        res(data);
      }, (err) => {
        rej(err);
      });
    });
  }

  setLocation(location: any) {
    this.location = location;
  }

  getLocation() {
    return this.location;
  }

  calLocation() {
    const watch = this.geolocation.watchPosition();
    // console.log(watch);
    watch.subscribe((res: any) => {
      this.location = res;
      console.log(res);
    });
    return watch;
  }

  insertFeature(obj: any) {
    return new Promise((res, rej) => {
      const url = `http://cgi.uru.ac.th:3000/api/addcircle`;
      this.http.post(url, obj).subscribe((data: any) => {
        this.setLocation(res);
        res(data);
      }, (err) => {
        rej(err);
      });
    });
  }

  getCircle() {
    return new Promise((res, rej) => {
      const url = `http://cgi.uru.ac.th:3000/api/getcircle`;
      this.http.get(url).subscribe(data => {
        res(data);
      }, (err) => {
        rej(err);
      });
    });
  }

}
