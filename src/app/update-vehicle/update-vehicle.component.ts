import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../vehicle';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.css']
})
export class UpdateVehicleComponent implements OnInit {

  id: string;
  nid: number;
  vehicle: Vehicle;

  constructor(private route: ActivatedRoute,private router: Router,
    private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicle = new Vehicle();

    this.id = this.route.snapshot.params['id'];
    this.updateVehicle();    
    
    
    this.vehicleService.getVehicle(this.id)
      .subscribe(data => {
        console.log(data)
        this.vehicle = data;
      }, error => console.log(error));
  }

  updateVehicle() {
    this.vehicleService.associateVehicleWithPatrol("etest2","etest2", this.vehicle)
      .subscribe(data => console.log(data), error => console.log(error));
    this.vehicle = new Vehicle();
    this.gotoList();
  }

  onSubmit() {
   // this.updateVehicle();    
  }

  gotoList() {
    this.router.navigate(['/vehicles']);
  }
}
