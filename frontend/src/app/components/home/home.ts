import{Component, OnInit, Inject, PLATFORM_ID}from '@angular/core';
import {isPlatformBrowser}from '@angular/common';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule}from '@angular/forms';
import {CommonModule}from '@angular/common';
import {Router}from '@angular/router';
import {BusService}from '../../services/bus';
@Component({
selector: 'app-home',
standalone: true,
imports: [CommonModule, ReactiveFormsModule], // Dono imports zaruri hain
templateUrl: './home.html',
styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
searchForm!: FormGroup;
userName: string = 'User';
buses: any[] = [];
isSearched: boolean = false;
loading: boolean = false;

popularDestinations = [
{
name: 'Delhi to Agra',
price: 499,
image: 'assets/agra.webp'
},
{
name: 'Mumbai to Pune',
price: 350,
image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w = 500'
},
{
name: 'Bangalore to Goa',
price: 950,
image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w = 500'
}
];

constructor(private fb: FormBuilder, private router: Router, private busService: BusService, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
   if (isPlatformBrowser(this.platformId)) {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
       this.userName = storedName;
    }
   }

    this.searchForm = this.fb.group({
      fromCity: ['', Validators.required],
      toCity: ['', Validators.required],
      travelDate: ['', Validators.required],

    });
  }

  onLogout() {
    if (isPlatformBrowser(this.platformId)) {
    console.log("User looged out");
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    }
    this.router.navigate(['/login']);
  }

 onSearch() {
  if (this.searchForm.valid) {
    const { fromCity, toCity, travelDate } = this.searchForm.value;


    this.router.navigate(['/search-results'], {
      queryParams: {
        from: fromCity,
        to: toCity,
        date: travelDate
      }
    });
  } else {
    alert("Please fill all the details.");
  }
}
}
