import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profileService';
import { NoteService } from '../../service/note-service';
import { Note } from '../../model/note';
import { Profile } from '../../model/profile';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule, DragDropModule],
  selector: 'app-notes',
  templateUrl: './notes.html',
  styleUrls: ['./notes.css']
})
export class NotesComponent implements OnInit {

  faTrash = faTrash;
  faEdit = faEdit;
  profiles: Profile[] = [];
  selectedProfileId: string | null = null;

  notes: Note[] = [];

  toDoNotes: Note[] = [];
  inProgressNotes: Note[] = [];
  doneNotes: Note[] = [];

  loadingNotes = false;

  newNote: Note = {
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'TO_DO'
  };

  showCreateModal = false;

  constructor(
    private profileService: ProfileService,
    private noteService: NoteService
  ) { }

  ngOnInit(): void {
    this.loadProfiles();
  }

  loadProfiles() {
    this.profileService.getAllProfiles().subscribe(profiles => {
      this.profiles = profiles;
    });
  }

  onSelectProfile(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const profileId = selectElement.value;
    this.selectedProfileId = profileId;
    if (!profileId) return;

    this.loadingNotes = true;
    this.noteService.getNotesByProfile(profileId).subscribe(notes => {
      this.notes = notes;
      this.categorizeNotes();
      this.loadingNotes = false;
    });
  }

  categorizeNotes() {
    this.toDoNotes = this.notes.filter(note => note.status === 'TO_DO');
    this.inProgressNotes = this.notes.filter(note => note.status === 'IN_PROGRESS');
    this.doneNotes = this.notes.filter(note => note.status === 'DONE');
  }

  getSelectedProfileName(): string {
    const profile = this.profiles.find(p => p.id === this.selectedProfileId);
    return profile ? profile.name : '';
  }

  countToDo() {
    return this.toDoNotes.length;
  }

  countInProgress() {
    return this.inProgressNotes.length;
  }

  countDone() {
    return this.doneNotes.length;
  }

  loadNotes(profileId: string) {
    this.loadingNotes = true;
    this.noteService.getNotesByProfile(profileId).subscribe(notes => {
      this.notes = notes;
      this.categorizeNotes();
      this.loadingNotes = false;
    });
  }

  onCreateNewTask() {
    this.resetNewNote();
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

  resetNewNote() {
    this.newNote = {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      status: 'TO_DO'
    };
  }

  submitNewNote() {
    if (!this.selectedProfileId) return;

    const isEdit = !!this.newNote.id;

    if (isEdit) {
      this.noteService.updateNote(this.newNote).subscribe({
        next: (updatedNote) => {
          const index = this.notes.findIndex(n => n.id === updatedNote.id);
          if (index !== -1) this.notes[index] = updatedNote;
          this.categorizeNotes();
          this.showCreateModal = false;
        },
        error: () => alert('Failed to update the note.')
      });
    } else {
      this.noteService.createNote(this.selectedProfileId, this.newNote).subscribe({
        next: (createdNote) => {
          this.notes.push(createdNote);
          this.categorizeNotes();
          this.showCreateModal = false;
        },
        error: () => alert('Unable to create task. Please try again later.')
      });
    }
  }


  onDrop(event: CdkDragDrop<Note[]>, newStatus: string) {
    const draggedNote: Note = event.item.data;

    if (draggedNote.status === newStatus) {
      return;
    }

    if (event.previousContainer.id === event.container.id) {
      return;
    }

    draggedNote.status = newStatus;

    const indexInNotes = this.notes.findIndex(n => n.id === draggedNote.id);
    if (indexInNotes !== -1) {
      this.notes[indexInNotes].status = newStatus;
    }

    this.noteService.updateNoteStatus(draggedNote.id!, newStatus).subscribe({
      next: () => {
        this.categorizeNotes();
      },
      error: () => {
        alert('Error updating task status. Please try again later.');
        this.loadNotes(this.selectedProfileId!);
      }
    });
  }

  editNote(note: Note) {
    this.newNote = { ...note }; // carrega dados no modal
    this.showCreateModal = true;
  }

  deleteNote(note: Note) {
    if (confirm('Are you sure you want to delete this note?')) {
      this.noteService.deleteNote(note.id!).subscribe({
        next: () => {
          this.notes = this.notes.filter(n => n.id !== note.id);
          this.categorizeNotes();
        },
        error: () => alert('Error deleting the note.')
      });
    }
  }

}
