import { Routes } from '@angular/router';
import { Livres } from './livres/livres';
import { AddLivre } from './add-livre/add-livre';
import { UpdateLivre } from './update-livre/update-livre';
import { RechercheParEcrivain } from './recherche-par-ecrivain/recherche-par-ecrivain';
import { RechercheParTitre } from './recherche-par-titre/recherche-par-titre';
import { ListeEcrivains } from './liste-ecrivains/liste-ecrivains';
import { Login } from './login/login';
import { Forbidden } from './forbidden/forbidden';
import { livreGuard } from './livre.guard';
import { RegisterComponent } from './register/register';
import { VerifEmailComponent } from './verif-email/verif-email';

export const routes: Routes = [
  { path: 'livres', component: Livres },
  { path: 'add-livre', component: AddLivre, canActivate: [livreGuard] },
  { path: 'updateLivre/:id', component: UpdateLivre, canActivate: [livreGuard] },
  { path: 'rechercheParEcrivain', component: RechercheParEcrivain },
  { path: 'rechercheParTitre', component: RechercheParTitre },
  { path: 'listeEcrivains', component: ListeEcrivains },
  { path: 'listeCategories', redirectTo: 'listeEcrivains' },
  { path: 'login', component: Login },
  { path: 'register', component: RegisterComponent },
  { path: 'verifEmail', component: VerifEmailComponent },
  { path: 'app-forbidden', component: Forbidden },
  { path: '', redirectTo: 'livres', pathMatch: 'full' },
];
