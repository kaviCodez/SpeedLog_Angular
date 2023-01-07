import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private baseUrl = 'http://localhost:8081/vehicle';
  private basePUrl = 'http://localhost:8081/vehicle/all';
  private getUrl ='http://localhost:8081/vehicle/location?carNumber=etest2'

  constructor(private http: HttpClient) { }

  getVehicle(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createVehicle(vehicle: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, vehicle);
  }

  updateVehicle(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteVehicle(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getVehiclesList(): Observable<any> {
    return this.http.get(`${this.basePUrl}`);
  }

  getVehicleByNumber(carNumber:string):  Observable<any> {
    return this.http.get(`${this.getUrl}`);
  }

}
