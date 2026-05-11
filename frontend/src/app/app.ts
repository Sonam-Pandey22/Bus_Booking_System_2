import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // NgIf, NgFor ke liye
import { FormsModule } from '@angular/forms';   // [(ngModel)] ke liye
import { SearchResultsComponent } from './components/search-results/search-results';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
   CommonModule,
   FormsModule
   ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  protected readonly title = signal('Bus Booking System');
}
