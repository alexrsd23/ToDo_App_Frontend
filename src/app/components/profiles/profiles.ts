import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { faEdit, faPlusCircle, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { Profile } from '../../model/profile';
import { ProfileService } from '../../service/profileService';

@Component({
  selector: 'app-profiles',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './profiles.html',
  styleUrl: './profiles.css'
})
export class Profiles implements OnInit {
  faPlusCircle = faPlusCircle;
  faUser = faUser;
  faTrash = faTrash;
  faEdit = faEdit;
  showDialog = false;
  profileName = '';
  profiles: Profile[] = [];
  editedProfileId: string | null = null;
  editedProfileName: string = '';


  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.loadProfiles();
  }

  loadProfiles(): void {
    this.profileService.getAllProfiles().subscribe({
      next: (data) => {
        this.profiles = data;
      },
      error: (err) => {
        console.error('Error loading profiles:', err);
      },
    });
  }

  openDialog(): void {
    this.showDialog = true;
  }

  closeDialog(): void {
    this.showDialog = false;
    this.profileName = '';
  }

  createProfile(): void {
    if (!this.profileName.trim()) {
      alert('Profile name is required.');
      return;
    }

    const newProfile: Profile = { name: this.profileName };

    this.profileService.createProfile(newProfile).subscribe({
      next: (createdProfile) => {
        this.profiles.push(createdProfile);
        this.closeDialog();
      },
      error: (err) => {
        console.error('Error creating profile:', err);
        alert('Failed to create profile.');
      },
    });
  }

  deleteProfile(id: string): void {
    if (confirm('Tem certeza que deseja excluir este perfil?')) {
      this.profileService.deleteProfile(id).subscribe({
        next: () => {
          this.profiles = this.profiles.filter(p => p.id !== id);
        },
        error: (err) => {
          console.error('Erro ao excluir o perfil:', err);
          alert('Não foi possível excluir o perfil.');
        }
      });
    }
  }

  startEdit(profile: Profile): void {
    this.editedProfileId = profile.id!;
    this.editedProfileName = profile.name;
  }

  cancelEdit(): void {
    this.editedProfileId = null;
    this.editedProfileName = '';
  }

 saveEdit(profileId: string): void {
  const updatedProfile: Profile = { name: this.editedProfileName };

  this.profileService.updateProfile(profileId, updatedProfile).subscribe({
    next: (updated) => {
      const index = this.profiles.findIndex(p => p.id === profileId);
      if (index !== -1) {
        this.profiles[index].name = updated.name;
      }
      this.cancelEdit();
    },
    error: (err) => {
      console.error('Error updating profile:', err);
      alert('Failed to update profile.');
    }
  });
}

}
