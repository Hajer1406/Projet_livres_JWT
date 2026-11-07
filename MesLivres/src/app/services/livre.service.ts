import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livre } from '../model/livre.model';
import { Ecrivain } from '../model/ecrivain.model';
import { EcrivainWrapper } from '../model/ecrivainWrapped.model';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class LivreService {
  apiURL: string = environment.apiURL;
  apiURLEcriv: string = environment.apiURLEcriv;

  constructor(private http: HttpClient) {}

  listeLivre(): Observable<Livre[]> {
    return this.http.get<Livre[]>(this.apiURL + '/all');
  }

  ajouterLivre(livre: Livre): Observable<Livre> {
    return this.http.post<Livre>(this.apiURL + '/addlivre', livre, httpOptions);
  }

  supprimerLivre(id: number): Observable<any> {
    const url = `${this.apiURL}/dellivre/${id}`;
    return this.http.delete(url, httpOptions);
  }

  consulterLivre(id: number): Observable<Livre> {
    const url = `${this.apiURL}/getbyid/${id}`;
    return this.http.get<Livre>(url);
  }

  updateLivre(livre: Livre): Observable<Livre> {
    return this.http.put<Livre>(this.apiURL + '/updatelivre', livre, httpOptions);
  }

  listeEcrivains(): Observable<EcrivainWrapper> {
    return this.http.get<EcrivainWrapper>(this.apiURLEcriv);
  }

  consulterEcrivain(id: number): Observable<Ecrivain> {
    const url = `${this.apiURLEcriv}/${id}`;
    return this.http.get<Ecrivain>(url);
  }

  ajouterEcrivain(ecriv: Ecrivain): Observable<Ecrivain> {
    return this.http.post<Ecrivain>(this.apiURLEcriv, ecriv, httpOptions);
  }

  updateEcrivain(ecriv: Ecrivain): Observable<Ecrivain> {
    const url = `${this.apiURLEcriv}/${ecriv.idEcrivain}`;
    return this.http.put<Ecrivain>(url, ecriv, httpOptions);
  }

  // ── Recherche par écrivain (id) ──────────────────────────────
  rechercherParEcrivain(idEcrivain: number): Observable<Livre[]> {
    const url = `${this.apiURL}/livrsecriv/${idEcrivain}`;
    return this.http.get<Livre[]>(url);
  }

  // ── Recherche par titre (API backend) ───────────────────────
  rechercherParTitre(titre: string): Observable<Livre[]> {
    const url = `${this.apiURL}/livresByTitre/${titre}`;
    return this.http.get<Livre[]>(url);
  }
}

export { LivreService as Livre };
