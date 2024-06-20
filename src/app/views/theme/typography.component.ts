import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent } from '@coreui/angular';

interface UserRole {
  roleName: string;
  roleId: string;
  userName: string;
  gender: string;
}

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  standalone: true,
  imports: [
    CommonModule, // Import CommonModule
    FormsModule, // Import FormsModule
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
  ],
})
export class TypographyComponent implements OnInit {
  userRoles: UserRole[] = [];
  newUserRole: UserRole = { roleName: '', roleId: '', userName: '', gender: '' };
  showForm: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.loadUserRoles();
  }

  loadUserRoles() {
    // Implement the logic to load user roles from the backend
    // For example:
    // this.userService.getUserRoles().subscribe(data => this.userRoles = data);
  }

  addUserRole() {
    this.showForm = true;
  }

  saveNewUserRole() {
    if (this.newUserRole.roleName && this.newUserRole.roleId && this.newUserRole.userName && this.newUserRole.gender) {
      this.userRoles.push({ ...this.newUserRole });
      this.newUserRole = { roleName: '', roleId: '', userName: '', gender: '' };
      this.showForm = false;
    }
  }

  cancelAddUserRole() {
    this.showForm = false;
  }

  updateUserRole(index: number) {
    console.log(`Updating user role at index ${index}`);
    // Add logic to update the user role if needed
  }

  deleteUserRole(index: number) {
    this.userRoles.splice(index, 1);
  }
}
