import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, Location, isPlatformBrowser  } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { BusBookingService } from '../../services/bus-booking';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passenger-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './passenger-info.html',
  styleUrl: './passenger-info.css'
})
export class PassengerInfoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private bookingService = inject(BusBookingService);
  private location = inject(Location);
  private platformId = inject(PLATFORM_ID);


  isContactEditing: boolean = false;
  passengerForm!: FormGroup;
  bookingDetails: any;
  activeIndex: number | null = 0;

 ngOnInit() {
  // 1. Service se data load karein
  this.bookingDetails = this.bookingService.getBookingData();

  // 2. Form ko DEFAULT values ke saath initialize karein (Taaki Server pe error na aaye)
  this.passengerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    whatsappUpdates: [true],
    passengers: this.fb.array([])
  });

  // 3. Ab sirf BROWSER mein localStorage se data bharein
  if (isPlatformBrowser(this.platformId)) {
    const data = localStorage.getItem('userDetails');
    const loggedInUser = JSON.parse(data || '{}');

    // patchValue ka use karke form mein database ka data bharein
    this.passengerForm.patchValue({
      email: loggedInUser.email || '',
      phone: loggedInUser.phone || ''
    });

    this.isContactEditing = false;

    // Seats ke hisaab se passenger fields add karein
    if (this.bookingDetails && this.bookingDetails.selectedSeats) {
      this.bookingDetails.selectedSeats.forEach((seat: any) => {
        this.addPassenger(seat.seatNumber);
      });
    }
  }
}

  toggleContactEdit() {
  this.isContactEditing = !this.isContactEditing;
}

  togglePassenger(index: number) {
    this.activeIndex = index;
  }

  
  get passengers() {
    return this.passengerForm.get('passengers') as FormArray;
  }

  addPassenger(seatNo: string) {
    this.passengers.push(this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      gender: ['', Validators.required],
      seatNumber: [seatNo]
    }));
  }

  proceedToPayment() {
    if (this.passengerForm.valid) {
      console.log("Proceeding with data:", this.passengerForm.value);
      alert("Validation Success! Next step: Payment Gateway.");
    } else {
      alert("Please fill all details!");
      this.passengerForm.markAllAsTouched();
    }
  }

  goBack() { this.location.back(); }


formatTimeTo12Hour(time: string): string {
    if (!time) return 'N/A';
    
    // Agar time "21:30:00" format mein hai toh use split karein
    const [hours, minutes] = time.split(':');
    let h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    
    h = h % 12 || 12; // 0 ko 12 set karne ke liye
    
    return `${h}:${minutes} ${ampm}`;
  }
}
