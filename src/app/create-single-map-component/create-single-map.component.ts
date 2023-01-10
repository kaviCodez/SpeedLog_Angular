import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loader} from '@googlemaps/js-api-loader'
import { VehicleService } from "../vehicle.service";
//import { truncateSync } from 'fs';
import { Vehicle } from "../vehicle";
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { interval, Observable } from "rxjs";

@Component({
  selector: 'app-create-map',
  templateUrl: './create-single-map.component.html',
  styleUrls: ['./create-single-map.component.css']
})
export class CreateSingleMapComponent implements OnInit {
  title = 'google-maps';
  map: google.maps.Map;
  locations: Vehicle[];
  allLocations: Vehicle[];
  markers: google.maps.Marker[] = [];

  //private map  = google.maps.Map;
  constructor(private vehicleService: VehicleService,
    private router: Router) {

    }

    getVehicleByName(vehicleName: string) {
      this.vehicleService.getVehicleByNumber(vehicleName)
        .subscribe(
          data => {
            this.locations = data;
            console.log(data);
            for (let location of this.locations) {
              // The marker's position property needs an object like { lat: 0, lng: 0 };
              // Number(location.latitude) is there to convert the string to a number, but if it's a number already, there's no need to cast it further.
              let latLng = {lat: Number(location.lat), lng: Number(location.lng)};
              const marker3 = new google.maps.Marker({
                position:latLng,
                map:this.map,
                title:"test2",
                label: {
                  text:"POLICE",
                  color: "RED",
                  fontWeight:"bold"
              },
                animation: google.maps.Animation.BOUNCE,
                icon: 'http://maps.google.com/mapfiles/kml/shapes/cabs.png'
              // icon: '//developers.google.com/maps/documentation/javascript/examples/full/images/cabs.png'
              })
            }
           // this.reloadData();
          },
          error => console.log(error));
    }

  ngOnInit() {
   // this.getVehicleByName("etest2");
    const secondsCounter = interval(20000);
// Subscribe to begin publishing values
secondsCounter.subscribe(n => {
  for (let i = 0; i < this.markers.length; i++) {
    this.markers[i].setMap(null);
  }
  const vehiclenumber = localStorage.getItem("vehicleNumber")
  this.getVehicleByName(vehiclenumber);
});

     
    
   // this.reloadData();
    let loader = new Loader({
      apiKey: 'API-KEY'
      
    })
    
    loader.load().then(()=>{
      const location = {
        lat:19.289193419745192,
        lng: -81.36917155103163
      };
      const markerLocation = {
        lat:19.29810454482719,
        lng: -81.35758441835928
      };
       this.map =new google.maps.Map(document.getElementById("map"),{
        center:location,
        zoom: 15
      })
    })
   
    
  }

  

}
