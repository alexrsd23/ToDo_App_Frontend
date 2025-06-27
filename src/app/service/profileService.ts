import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../model/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  private readonly apiUrl = 'http://localhost:8080/profiles';

  constructor(private http: HttpClient) {}

  createProfile(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(this.apiUrl, profile);
  }

  getAllProfiles(): Observable<Profile[]> {
  return this.http.get<Profile[]>(`${this.apiUrl}`);
}

  deleteProfile(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getProfile(id: string): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/${id}`);
  }

  updateProfile(id: string, updatedProfile: Profile): Observable<Profile> {
  return this.http.put<Profile>(`${this.apiUrl}/${id}`, updatedProfile);
}

}
