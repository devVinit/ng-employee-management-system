import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';
import { Employee } from '../models/employee.model';
import { UtilityService } from './utility.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public filterObjectSubject = new BehaviorSubject<any>({ pageNumber: 1, pageSize: 10 });

  public allJobTitles = ['VP Product Management', 'Staff Scientist', 'Chief Design Engineer',
    'Safety Technician II', 'Help Desk Technician',
    'Structural Analysis Engineer', 'Chemical Engineer',
    'Systems Administrator IV', 'Graphic Designer', 'Statistician IV',
    'Assistant Professor', 'Administrative Officer', 'Human Resources Assistant II',
    'Dental Hygienist', 'Tax Accountant', 'VP Quality Control', 'Human Resources Manager',
    'VP Sales', 'Pharmacist', 'Software Consultant', 'Senior Quality Engineer',
    'Mechanical Systems Engineer', 'Developer I', 'Research Nurse', 'Sales Associate',
    'Safety Technician III', 'Engineer IV', 'Geological Engineer', 'Recruiter',
    'GIS Technical Architect', 'Marketing Manager', 'Legal Assistant', 'Safety Technician IV',
    'Analog Circuit Design manager', 'Electrical Engineer', 'VP Marketing',
    'Senior Sales Associate', 'Financial Analyst', 'Nurse', 'Physical Therapy Assistant',
    'Business Systems Development Analyst', 'Desktop Support Technician',
    'Automation Specialist II', 'Sales Representative', 'Quality Control Specialist',
    'Accountant IV', 'Recruiting Manager', 'Health Coach I', 'Safety Technician I',
    'Cost Accountant', 'Account Executive', 'Editor', 'Automation Specialist I',
    'Database Administrator III', 'Database Administrator II', 'Computer Systems Analyst II',
    'Analyst Programmer', 'Junior Executive', 'Community Outreach Specialist',
    'Product Engineer', 'Environmental Specialist', 'Internal Auditor', 'Civil Engineer',
    'Nuclear Power Engineer', 'Web Designer III', 'Structural Engineer', 'Account Coordinator',
    'Professor', 'Health Coach II', 'Director of Sales', 'Teacher'];

  public allDepartments = ['Marketing', 'Research and Development', 'Legal',
    'Human Resources', 'Services', 'Support', 'Accounting', 'Training',
    'Product Management', 'Sales', 'Business Development', 'Engineering'];

  public allCompanies = ['Oyoloo', 'Riffpedia', 'Flashpoint', 'Twitterworks',
    'Flipbug', 'Snaptags', 'Thoughtbridge', 'Jetpulse', 'Skidoo', 'Browsetype'];

  public allLocations = ['Stockholm', 'Pensilvania', 'London', 'San Vicente', 'Santa Rita'];

  public allGenders = ['Male', 'Female'];

  constructor(public httpClient: HttpClient, public utilityService: UtilityService) { }

  getAllEmployees(): Observable<Employee[]> {
    return this.filterObjectSubject.asObservable().pipe(
      switchMap((filter: any) => this.httpClient
        .get<Employee[]>('assets/MOCK_DATA.json')
        .pipe(map(((response: Employee[]) => this.filterData(this.utilityService.keysToCamel(response), filter)))))
    );
  }

  getFilterObject$(): Observable<any> {
    return this.filterObjectSubject.asObservable();
  }

  updateFilterObject(value): void {
    const filterObject = this.utilityService.filterParams({ ...this.filterObjectSubject.getValue(), ...value });
    this.filterObjectSubject.next(filterObject);
  }

  filterData(employees: Employee[], filterObject: any): Employee[] {
    if (filterObject.search) {
      employees = employees
        .filter((employee: Employee) => employee.firstName.toLowerCase().includes(filterObject.search.toLowerCase()) ||
          employee.lastName.toLowerCase().includes(filterObject.search.toLowerCase()));
    } else if (filterObject.byAttribute) {
      Object.keys(filterObject.byAttribute).forEach(attribute => {
        employees = employees.filter((employee: Employee) => filterObject.byAttribute[attribute].includes(employee[attribute]));
      });
    }

    const { pageNumber, pageSize } = filterObject;

    const trimStart = (pageNumber - 1) * pageSize;
    const trimEnd = trimStart + pageSize;

    return employees.slice(trimStart, trimEnd);
  }

}
