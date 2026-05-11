import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // *ngFor aur *ngIf ke liye zaroori hai
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { BusBookingService } from '../../services/bus-booking';

@Component({
  selector: 'app-boarding-dropping',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './boarding-dropping.html',
  styleUrl: './boarding-dropping.css',
})
export class BoardingDroppingComponent implements OnInit {
  // Data variables
  busId: number | null = null;
  fromCity: string = '';
  toCity: string = '';
  totalPrice: number = 0;
  selectedSeats: any[] = [];

  // Points list
  boardingPoints: any[] = [];
  droppingPoints: any[] = [];
  
  // UI State
  activeTab: 'boarding' | 'dropping' = 'boarding';
  selectedBoarding: any = null;
  selectedDropping: any = null;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private location: Location,
    private cdr: ChangeDetectorRef,
    private bookingService: BusBookingService
  ) {
    // Seat Selection page se data receive karna
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const state = navigation.extras.state;
      this.fromCity = state['fromCity'];
      this.toCity = state['toCity'];
      this.totalPrice = state['totalPrice'];
      this.selectedSeats = state['selectedSeats'];
    }
  }


  formatTimeTo12Hour(time: string): string {
    if (!time) return 'N/A';
    
    // Agar time "21:30:00" format mein hai toh use split karein
    const [hours, minutes] = time.split(':');
    let h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    
    h = h % 12 || 12; // 0 ko 12 set karne ke liye
    
    return `${h}:${minutes} ${ampm}`;
  }


  goBack() {
  this.location.back();
  }

  ngOnInit(): void {
    const savedData = this.bookingService.getBookingData();
    this.fromCity = savedData.fromCity;
    this.toCity = savedData.toCity;
    this.totalPrice = savedData.totalPrice;
    this.selectedSeats = savedData.selectedSeats;
    
    // Agar user Passenger Info se back aaya hai, toh purane selected points dikhayenge
    this.selectedBoarding = savedData.boardingPoint;
    this.selectedDropping = savedData.droppingPoint;

    // URL se busId nikalna (e.g., /boarding-dropping/1)
    this.busId = Number(this.route.snapshot.paramMap.get('id'));
    
    if (this.busId) {
      this.getBusPoints(this.busId);
    }
  }

  // Backend API se Boarding aur Dropping points fetch karna
  getBusPoints(id: number) {
    this.isLoading = true;
    this.http.get<any[]>(`http://localhost:8080/api/points/${id}`).subscribe({
      next: (data) => {
        // Data ko filter karke tabs ke liye ready karna
        console.log("Data Received:", data);
        this.boardingPoints = data.filter(p => p.type === 'BOARDING');
        this.droppingPoints = data.filter(p => p.type === 'DROPPING');
        this.isLoading = false;

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Error fetching points:", err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Point selection logic
  onSelectPoint(point: any) {
    if (this.activeTab === 'boarding') {
      this.selectedBoarding = point;

      setTimeout(() => {
      this.activeTab = 'dropping';
      this.cdr.detectChanges();// UI update karne ke liye
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);

    } else {
      this.selectedDropping = point;
    }
  }

  // Agle page (Passenger Details) par jane ke liye
  proceedToPassengerDetails() {
    if (this.selectedBoarding && this.selectedDropping) {
      this.bookingService.setBookingData({
        boardingPoint: this.selectedBoarding,
        droppingPoint: this.selectedDropping
      });


      this.router.navigate(['/passenger-info'])
    }else {
    alert("Please select both boarding and dropping points.");
    }

  }

  
}