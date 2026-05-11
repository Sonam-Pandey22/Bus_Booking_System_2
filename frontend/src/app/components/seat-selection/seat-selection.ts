import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SeatService } from '../../services/seat';
import { BusBookingService } from '../../services/bus-booking';
import { Location } from '@angular/common';


interface Seat {
  seatId: number;
  seatNumber: string;
  seatType: string;
  deckType: string;
  price: number;
  booked: boolean;
}

@Component({
  selector: 'app-seat-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seat-selection.html',
  styleUrl: './seat-selection.css',
})
export class SeatSelectionComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private seatService = inject(SeatService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private bookingService = inject(BusBookingService);
  private location = inject(Location);
  
  fromCity: string = '';
  toCity: string = '';

  lowerDeck: Seat[] = [];
  upperDeck: Seat[] = [];
  selectedSeats: Seat[] = [];
  totalPrice: number = 0;
  busId: number | null = null;

  goBack() {
    this.location.back(); //
  }

  ngOnInit(): void {
    // FIX: Snapshot ki jagah Subscribe use karein. Reload par reliable hota hai.
    const savedData = this.bookingService.getBookingData();
    if (savedData.selectedSeats.length > 0) {
      this.selectedSeats = [...savedData.selectedSeats];
      this.totalPrice = savedData.totalPrice;
    }
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.busId = Number(idParam);
        this.loadSeatsFromAPI();
      }
    });
  

   this.route.queryParams.subscribe(params => {
      this.fromCity = params['from'] || 'Source';
      this.toCity = params['to'] || 'Destination';
      this.cdr.detectChanges(); // UI refresh karein
    });
  }

  loadSeatsFromAPI() {
  if (!this.busId) {
    console.error("Bus ID not found!");
    return;
  }

  this.seatService.getSeatsByBusId(this.busId).subscribe({
    next: (response: any) => {
      console.log("Data Received:", response);
      
      if (response && Array.isArray(response) && response.length > 0) {
        // Storing filtered data in local variables first
        const lDeck = response.filter(s => s.deckType.toLowerCase() === 'lower');
        const uDeck = response.filter(s => s.deckType.toLowerCase() === 'upper');

        // Update UI only if seats are actually found after filtering
        if (lDeck.length > 0 || uDeck.length > 0) {
          this.lowerDeck = [...lDeck];
          this.upperDeck = [...uDeck];
          this.cdr.detectChanges(); 
        } else {
          console.warn("API succeeded, but no seats matched the filter. Check DeckType values!");
        }
      } else {
        console.error("Backend returned an empty array.");
      }
    },
    error: (err) => {
      console.error("Backend connection lost or request failed!", err);
    }
  });
}

  selectSeat(seat: Seat) {
    if (seat.booked) return;
    const index = this.selectedSeats.findIndex(s => s.seatId === seat.seatId);
    if (index > -1) {
      this.selectedSeats.splice(index, 1);
      this.totalPrice -= seat.price;
    } else if (this.selectedSeats.length < 6) {
      this.selectedSeats.push(seat);
      this.totalPrice += seat.price;
    } else {
      alert("Maximum 6 seats allowed.");
    }
  }

  isSelected(seat: Seat): boolean {
    return this.selectedSeats.some(s => s.seatId === seat.seatId);
  }

  proceedToBoarding() {

    if (this.selectedSeats.length === 0) {
    alert("Please select at least one seat to proceed.");
    return;
  }

  this.bookingService.setBookingData({
      selectedSeats: this.selectedSeats,
      totalPrice: this.totalPrice,
      fromCity: this.fromCity,
      toCity: this.toCity,
      busId: this.busId
    });
    this.router.navigate(['/boarding-dropping', this.busId])
}
}