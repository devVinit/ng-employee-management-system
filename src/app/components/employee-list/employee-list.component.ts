import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilityService } from 'src/app/services/utility.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  public employeeList$: Observable<Employee[]>;

  public defaultPageIndex = 0;
  public defaultPageSize = 10;

  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeList$ = this.employeeService.getAllEmployees();
    this.employeeService.getFilterObject$().subscribe(filter => {
      this.defaultPageIndex = filter.pageNumber - 1;
      this.defaultPageSize = filter.pageSize;
    });
  }

  onPaginatorChange(event: PageEvent): void {
    this.employeeService.updateFilterObject({
      pageNumber: event.pageIndex + 1,
      pageSize: event.pageSize
    });
  }

}
