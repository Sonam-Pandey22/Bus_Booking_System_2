import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BusService } from '../../services/bus'; // .service extension check karein

@Component({
selector: 'app-admin',
standalone: true,
imports: [ReactiveFormsModule, CommonModule],
templateUrl: './admin.html', // Extension sahi karein
styleUrls: ['./admin.css']    // Extension sahi karein
})
export class AdminComponent implements OnInit {
busForm!: FormGroup;
allBuses: any[] = [];
loading: boolean = false; // Yahan ':' add kiya hai

constructor(private fb: FormBuilder, private busService: BusService) {
    this.busForm = this.fb.group({
      busName: ['', Validators.required],
      fromCity: ['', Validators.required],
      toCity: ['', Validators.required],
      travelDate: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      availableSeats: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadBuses();
  }

  loadBuses() {
    this.loading = true;
    this.busService.getAllBuses().subscribe({
      next: (data) => {
        this.allBuses = data;
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading buses", err);
        this.loading = false;
      }
    });
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this bus?')) {
      this.busService.deleteBus(id).subscribe({
        next: () => {
          alert('Deleted Successfully!');
          this.loadBuses(); // List refresh
        },
        error: (err: any) => alert('Error deleting bus')
      });
    }
  }

  onSubmit() {
    if (this.busForm.valid) {
      this.busService.addBus(this.busForm.value).subscribe({
        next: (res) => {
          alert('Bus Added Successfully!');
          this.busForm.reset();
          this.loadBuses(); // Yeh line naye data ko turant table mein dikhayegi
        },
        error: (err) => alert('Error adding bus. Check if backend is running.')
      });
    }
  }
}
