import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
providedIn: 'root'
})
export class BusService {

// Base URL ko clean rakhein
private baseUrl = 'http://localhost:8080/api/trips';

constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  // 1. Search Trips (Backend se Match hona chahiye)
searchTrips(from: string, to: string, date: string): Observable<any[]> {
  let params = new HttpParams()
    .set('from', from)
    .set('to', to)
    .set('date', date);

  // Sirf tabhi headers attach karein jab search protected ho
  // Agar search public hai, toh bina headers ke bhej kar dekhein
  return this.http.get<any[]>(`${this.baseUrl}/search`, { params }).pipe(
    catchError((error) => {
      console.error('Error in Bus Search Service:', error);
      return throwError(() => new Error('Buses fetch karne mein problem hui.'));
    })
  );
}

  // 2. Add Bus
  addBus(busData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, busData, { headers: this.getHeaders() });
  }

  // 3. Get All (Agar backend mein endpoint hai)
  getAllBuses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`, { headers: this.getHeaders() });
  }
  deleteBus(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('Error deleting bus:', error);
        return throwError(() => new Error('Bus delete karne mein problem hui.'));
      })
    );
  }

  // Helper method headers ke liye (Code clean rahega)
  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return headers;
  }
}
