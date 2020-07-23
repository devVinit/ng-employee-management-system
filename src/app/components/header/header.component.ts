import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() clickMenu = new EventEmitter<any>();

  public searchTerm = new Subject<any>();
  public search: string;

  public isSearchClicked = false;
  public isDesktopMode = true;

  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
    if (window.innerWidth < 768) {
      this.isDesktopMode = false;
    }

    this.onSearchEmployee();
  }

  onSearchEmployee(): void {
    this.searchTerm.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(search => {
      this.employeeService.updateFilterObject({ search, pageNumber: 1 });
    });
  }
}
