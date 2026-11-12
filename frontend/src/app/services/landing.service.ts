import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feature, TeamMember, StoreContactInput, ContactResponse } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LandingService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  /**
   * Obtiene la lista de funcionalidades ordenadas por ID
   */
  getFeatures(): Observable<Feature[]> {
    return this.http.get<Feature[]>(`${this.apiUrl}/features`);
  }

  /**
   * Obtiene la lista de miembros del equipo ordenados por ID
   */
  getTeam(): Observable<TeamMember[]> {
    return this.http.get<TeamMember[]>(`${this.apiUrl}/team`);
  }

  /**
   * Registra una solicitud de contacto comercial B2B
   */
  sendContact(payload: StoreContactInput): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(`${this.apiUrl}/contacts`, payload);
  }

  /**
   * Verifica la conectividad con la API
   */
  checkHealth(): Observable<{ status: string; timestamp: string }> {
    return this.http.get<{ status: string; timestamp: string }>(`${this.apiUrl}/health`);
  }
}
