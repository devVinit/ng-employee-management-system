import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  public filterWithEmployeeAttribute: any = {};

  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void { }

  onSelectEmployeeAttribute(key: string, value: string, toAdd: boolean): void {
    if (toAdd) {
      if (this.filterWithEmployeeAttribute[key]) {
        this.filterWithEmployeeAttribute[key].push(value);
      } else {
        this.filterWithEmployeeAttribute[key] = [value];
      }
    } else {
      const index = this.filterWithEmployeeAttribute[key].findIndex(element => element === value);
      this.filterWithEmployeeAttribute[key].splice(index, 1);

      if (this.filterWithEmployeeAttribute[key].length === 0) {
        delete this.filterWithEmployeeAttribute[key];
      }
    }

    this.employeeService.updateFilterObject({ byAttribute: this.filterWithEmployeeAttribute, pageNumber: 1 });
  }

}
