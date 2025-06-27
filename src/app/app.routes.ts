import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Profiles } from './components/profiles/profiles';
import { NotesComponent } from './components/notes/notes';

export const routes: Routes = [
     {
    path: 'home',
    component: Home
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'profiles', component: Profiles },
  { path: 'notes', component: NotesComponent },
];
