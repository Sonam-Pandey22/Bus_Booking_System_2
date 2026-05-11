import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BusBookingService {
  // Yahan hum data store karenge
  private bookingData = {
    busDetails: null,
    selectedSeats: [],
    boardingPoint: null,
    droppingPoint: null,
    totalPrice: 0,
    fromCity: '',
    toCity: ''
  };

  constructor() { }

  // Data save karne ke liye function
  setBookingData(data: any) {
    this.bookingData = { ...this.bookingData, ...data };
  }

  // Data wapas lene ke liye function
  getBookingData() {
    return this.bookingData;
  }

  // Sab clear karne ke liye (jab ticket book ho jaye)
  clearBookingData() {
    this.bookingData = {
      busDetails: null,
      selectedSeats: [],
      boardingPoint: null,
      droppingPoint: null,
      totalPrice: 0,
      fromCity: '',
      toCity: ''
    };
  }
}