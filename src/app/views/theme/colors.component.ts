import { AfterViewInit, Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { getStyle, rgbToHex } from '@coreui/utils';
import { TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, RowComponent, ColComponent } from '@coreui/angular';
import { User } from './../../models/user.model';
import { UserService } from '../../service/service.service';

@Component({
  selector: 'app-colors',
  templateUrl: 'colors.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    RowComponent,
    ColComponent
  ],
  providers: [UserService]
})
export class ColorsComponent implements OnInit, AfterViewInit {
  users: User[] = [];
  newUser: User = {
    userName: '', userId: '', email: '', dob: '', gender: '',
    id: undefined
  };
  showForm: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit(): void {
    this.themeColors();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      users => this.users = users,
      error => console.error('Error fetching users:', error)
    );
  }

  addUser() {
    this.showForm = true;
  }

  saveNewUser() {
    console.log('saveNewUser called');
    console.log('newUser:', this.newUser);
    if (this.newUser.userName && this.newUser.userId && this.newUser.email && this.newUser.dob && this.newUser.gender) {
      this.userService.CreateUser(this.newUser).subscribe(
        user => {
          console.log('User created:', user);
          this.users.push(user);
          this.newUser = { userName: '', userId: '', email: '', dob: '', gender: '' };
          this.showForm = false;
        },
        error => {
          console.error('Error creating user:', error);
          alert('Error creating user: ' + error.message);
        }
      );
    } else {
      console.warn('Form is incomplete');
      alert('Please fill out all fields.');
    }
  }

  cancelAddUser() {
    this.showForm = false;
  }

  updateUser(index: number) {
    console.log(`Updating user at index ${index}`);
    // Add logic to update the user if needed
  }

  saveUser(index: number) {
    console.log(`Saving user at index ${index}`);
    // Add logic to save the user if needed
  }

  deleteUser(index: number) {
    const user = this.users[index];
    if (user && user.id) {
      this.userService.deleteUser(user.id).subscribe(
        () => {
          console.log('User deleted:', user);
          this.users.splice(index, 1);
        },
        error => console.error('Error deleting user:', error)
      );
    } else {
      this.users.splice(index, 1); // For cases where user.id might not be present
    }
  }

  public themeColors(): void {
    Array.from(this.document.querySelectorAll('.theme-color')).forEach(
      (element: Element) => {
        const htmlElement = element as HTMLElement;
        const background = getStyle('background-color', htmlElement) ?? '#fff';
        const table = this.renderer.createElement('table');
        table.innerHTML = `
          <table class="table w-100">
            <tr>
              <td class="text-muted">HEX:</td>
              <td class="font-weight-bold">${rgbToHex(background)}</td>
            </tr>
            <tr>
              <td class="text-muted">RGB:</td>
              <td class="font-weight-bold">${background}</td>
            </tr>
          </table>
        `;
        this.renderer.appendChild(htmlElement.parentNode, table);
      }
    );
  }
}
