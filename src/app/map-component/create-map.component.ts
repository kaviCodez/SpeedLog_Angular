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

  templateUrl: './create-map.component.html',

  styleUrls: ['./create-map.component.css']

})

export class CreateMapComponent implements OnInit {

  title = 'google-maps';

  map: google.maps.Map;

  locations: Vehicle[];

  allLocations: Vehicle[];

  markers: google.maps.Marker[] = [];

  isStation:String = localStorage.getItem("isStation")
  stationName = localStorage.getItem("stationName")
  vehicleName = localStorage.getItem("vehicleName")
  //private map  = google.maps.Map;

  constructor(private vehicleService: VehicleService,

    private router: Router) {



    }

    getVehicleByLocations() {

      this.vehicleService.getVehicleByLocations()

        .subscribe(

          data => {

            this.allLocations = data;

            const icon = {
              url: "https://cdn-icons-png.flaticon.com/512/2343/2343941.png", // url

              scaledSize: new google.maps.Size(35, 35) // scaled size

          };

            console.log(data);

            for (let locationData of this.allLocations) {

              // The marker's position property needs an object like { lat: 0, lng: 0 };

              // Number(location.latitude) is there to convert the string to a number, but if it's a number already, there's no need to cast it further.

              let latLngData = {lat: Number(locationData.lat), lng: Number(locationData.lng)};

              const marker4 = new google.maps.Marker({

                position:latLngData,

                map:this.map,

                title:"test2",

                label: {

                  text:locationData.vehicleNumber,

                  color: "RED",

                  fontWeight:"bold"

              },

                icon: icon,

                //animation:google.maps.Animation.BOUNCE

              // icon: '//developers.google.com/maps/documentation/javascript/examples/full/images/cabs.png'

              })

              this.markers.push(marker4);

            }

           // this.reloadData();

          },

          error => console.log(error));

    }




    getVehicleByName(vehicleName: string) {

      this.vehicleService.getVehicleByNumber(vehicleName)

        .subscribe(

          data => {

            this.locations = data;
            const icon = {
              url: "https://cdn-icons-png.flaticon.com/512/2343/2343941.png", // url

              scaledSize: new google.maps.Size(35, 35) // scaled size

          };

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

                  text:location.carNumber,

                  color: "RED",

                  fontWeight:"bold"

              },

                //animation: google.maps.Animation.BOUNCE,

                icon: icon,

              // icon: '//developers.google.com/maps/documentation/javascript/examples/full/images/cabs.png'

              })

              this.markers.push(marker3);

            }

           // this.reloadData();

          },

          error => console.log(error));

    }



  ngOnInit() {

   // this.getVehicleByName("etest2");

    const secondsCounter = interval(1000);

// Subscribe to begin publishing values

secondsCounter.subscribe(n => {

  for (let i = 0; i < this.markers.length; i++) {

    this.markers[i].setMap(null);

  }
  if(this.isStation==="true") {
  this.getVehicleByLocations();
  }else{
  this.getVehicleByName(this.vehicleName)
  }
});



     

    

   // this.reloadData();

    let loader = new Loader({

      apiKey: 'api-key'

      

    })

    

    



    

    //this.locations = this.locations;

console.log("location"+this.locations)

    

   

    

  }



}
