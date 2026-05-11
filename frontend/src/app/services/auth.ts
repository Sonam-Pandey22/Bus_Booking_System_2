import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class AuthService {
// Spring Boot Backend ka URL (check kijiye aapka port 8080 hi ho)
private apiUrl = 'http://localhost:8080/api/auth';

constructor(private http: HttpClient) { }

  // User Registration ke liye
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // User Login ke liye
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Login ke baad Token ko browser mein save karne ke liye
  saveToken(token: string) {
    localStorage.setItem('bus_auth_token', token);
  }

  // Check karne ke liye ki user login hai ya nahi
  isLoggedIn(): boolean {
    return !!localStorage.getItem('bus_auth_token');
  }

  // Logout karne ke liye
  logout() {
    localStorage.removeItem('bus_auth_token');
  }
}
