import { Component } from '@angular/core';

@Component({
  selector: 'app-accordions',
  templateUrl: './accordions.component.html',
})
export class AccordionsComponent {
  showForm: boolean = false; // Add this property
  newEmployee = {
    employeeName: '',
    employeeId: '',
    dob: '',
    gender: '',
    role: ''
  }; // Define newEmployee property
  employees = [
    { employeeName: 'Asela Perera', employeeId: 'w1953606', dob: '2002-12-01', gender: 'Male', role: 'Admin' },
    { employeeName: 'Jane Smith', employeeId: '67890', dob: '1985-05-23', gender: 'Female', role: 'User' },
    { employeeName: 'Michael Brown', employeeId: '13579', dob: '1978-11-11', gender: 'Male', role: 'User' },
    { employeeName: 'Emily Davis', employeeId: '24680', dob: '1992-07-07', gender: 'Female', role: 'Admin' }
  ]; // Add sample employees

  addEmployee() {
    this.showForm = true;
  }

  saveNewEmployee() {
    this.employees.push(this.newEmployee);
    this.newEmployee = {
      employeeName: '',
      employeeId: '',
      dob: '',
      gender: '',
      role: ''
    };
    this.showForm = false;
  }

  cancelAddEmployee() {
    this.showForm = false;
  }

  updateEmployee(index: number) {
    // Logic to update employee details
  }

  deleteEmployee(index: number) {
    this.employees.splice(index, 1);
  }
}
