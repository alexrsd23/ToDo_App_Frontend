import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../model/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080'; // ajuste se sua API estiver em outro host

  createNote(profileId: string, note: Note): Observable<Note> {
    return this.http.post<Note>(`${this.API_URL}/profiles/${profileId}/notes`, note);
  }

  getNotesByProfile(profileId: string): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.API_URL}/profiles/${profileId}/notes`);
  }

  getNoteById(id: string): Observable<Note> {
    return this.http.get<Note>(`${this.API_URL}/notes/${id}`);
  }

  updateNoteStatus(id: string, status: string): Observable<Note> {
    return this.http.put<Note>(`${this.API_URL}/notes/${id}/status?status=${status}`, null);
  }

  updateNote(note: Note): Observable<Note> {
    return this.http.put<Note>(`${this.API_URL}/notes/${note.id}`, note);
  }


  deleteNote(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/notes/${id}`);
  }
}
