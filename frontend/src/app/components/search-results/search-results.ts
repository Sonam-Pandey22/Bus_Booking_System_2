import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusService } from '../../services/bus';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-results.html',
  styleUrl: './search-results.css',
})
export class SearchResultsComponent implements OnInit{
fromCity: string = '';
toCity: string = '';
travelDate: string = '';

trips: any[] = [];
loading: boolean = false;

private route = inject(ActivatedRoute);
private busService = inject(BusService);
private router = inject(Router);
private location = inject(Location);

goBack() {
    this.location.back(); //
  }

ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.fromCity = params['from'] || '';
      this.toCity = params['to'] || '';
      this.travelDate = params['date'] || '';

      // Agar URL mein data hai, toh automatically search call karein
      if (this.fromCity && this.toCity) {
        this.onSearch();
      }
    });
  }
  constructor(private cdr: ChangeDetectorRef) {}
onSearch() {
  this.loading = true;
  this.trips = []; // Clear old data to prevent UI glitches during reload

  this.busService.searchTrips(this.fromCity, this.toCity, this.travelDate).subscribe({
    next: (data: any) => {
      console.log("Trips successfully fetched on reload:", data);
      this.trips = data;
      this.loading = false;
      this.cdr.detectChanges(); 
    },
    error: (err) => {
      // This will tell you if the 5-second delay caused a timeout
      console.error("API failed on reload! Backend might be slow or offline:", err);
      this.loading = false;
      this.cdr.detectChanges();
    }
  });
}
goToSeats(busId: number | undefined) {
  if (!busId) {
    console.error("Cannot navigate: Bus ID is missing for this trip.");
    alert("Bus details are incomplete for this trip.");
    return;
  }

  console.log("Navigating to seat selection for bus:", busId);
  
  this.router.navigate(['/select-seats', busId], {
    queryParams: {
      from: this.fromCity,
      to: this.toCity,
      date: this.travelDate
    }
  });
}

viewSeats(busId: number) {
    console.log("View seats clicked for:", busId);
    alert("Viewing seats for bus ID: " + busId);
  }

  formatTimeTo12Hour(time: string): string {
  if (!time) return 'N/A';
  
  // Maan lijiye database se "21:30:00" aa raha hai
  const [hours, minutes] = time.split(':');
  let h = parseInt(hours);
  const ampm = h >= 12 ? 'PM' : 'AM';
  
  h = h % 12 || 12; // 0 ko 12 set karne ke liye
  
  return `${h}:${minutes} ${ampm}`;
}
}


