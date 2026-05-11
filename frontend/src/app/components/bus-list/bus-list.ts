import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusService } from '../../services/bus';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-bus-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bus-list.html',
  styleUrl: './bus-list.css',
})
export class BusListComponent implements OnInit {
fromCity: string = '';
toCity: string = '';
travelDate: string = '';

buses: any[] = [];
loading: boolean = true;
searchData: any = {};

constructor(private route: ActivatedRoute, private busService: BusService) {}

ngOnInit(): void {
this.route.queryParams.subscribe(params => {
this.searchData = params;
this.fetchBuses();
});
}

fetchBuses(): void {
this.loading = true;

const from = this.searchData.from || '';
const to = this.searchData.to || '';
const date = this.searchData.date || '';

this.busService.searchTrips(from, to, date)
.subscribe({
next: (data: any) => {
this.buses = data;
this.loading = false;
},
error: (err: any) => {
console.error("Error in Bus List:", err);
this.loading = false;
}
});
}
}
