import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Iska matlab ye poori app mein kahi bhi use ho sakti hai
})
export class SeatService {
  // Backend API ka URL (Jo aapne IntelliJ mein chalaya hai)
  private apiUrl = 'http://localhost:8080/api/seats';

  // HttpClient ko inject karein backend se baat karne ke liye
  private http = inject(HttpClient);

  // Bus ID ke basis par seats mangwane ka method
  getSeatsByBusId(busId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/bus/${busId}`);
  }
}