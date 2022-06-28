import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeriodicElement } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class ElementsService {

  elementApiUrl = "https://localhost3000"

  constructor(private http: HttpClient) { }


  getElements(): Observable<PeriodicElement[]> {
    return this.http.get<PeriodicElement[]>(this.elementApiUrl);

  }



}
