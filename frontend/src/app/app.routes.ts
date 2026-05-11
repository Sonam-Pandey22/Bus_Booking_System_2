import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register'; // RegisterComponent yahan se match karega
import { BusSearchComponent } from './components/bus-search/bus-search'; // BusSearchComponent yahan se match karega
import { HomeComponent } from './components/home/home';
import { AdminComponent } from './components/admin/admin';
import { BusListComponent } from './components/bus-list/bus-list';
import { SearchResultsComponent } from './components/search-results/search-results';
import { SeatSelectionComponent } from './components/seat-selection/seat-selection';
import { BoardingDroppingComponent } from './components/boarding-dropping/boarding-dropping';
import { PassengerInfoComponent} from './components/passenger-info/passenger-info';


export const routes: Routes = [
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'home', component: HomeComponent },
{ path: 'admin', component: AdminComponent },
{ path: 'bus-list', component: BusListComponent },
{ path: '', component: HomeComponent },
{ path: 'search-results', component: SearchResultsComponent },
{ path: 'select-seats/:id', component: SeatSelectionComponent },
{ path: 'boarding-dropping/:id', component: BoardingDroppingComponent },
{ path: 'passenger-info', component: PassengerInfoComponent },
{ path: '', redirectTo: '/login', pathMatch: 'full' }
];
