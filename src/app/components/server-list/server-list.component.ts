import { Component, OnInit } from '@angular/core';
import { FilterService } from 'src/app/service/filter-service.service';

@Component({
  selector: 'server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.css']
})
export class serverListComponent implements OnInit {

  serverList: any = []; // to store server list
  filters:any = {}; // to store filters
  ramFiltersList: any = []; //to store server filter values
  selectedHddType: string; //to store selected hdd type
  selectedLocation: string; //to store selected location
  isFilterApplied: boolean; // flag to determine filter applied or not
  page = 1; //to store current page, default is selected to 1
  pageSize = 30; //to show number of items in a page

  constructor(private filterService: FilterService) { }

  ngOnInit() {
    let serverData = this.filterService.getServerListAndFilterValues();
    this.serverList = serverData.serverList;
    this.filters = serverData.filters;
    this.initRamFilterValues();
  }

  //This function is used to initialize ram filters
  initRamFilterValues(){
    this.ramFiltersList = this.filters.ram.map((ram: any) => {
      return {
        name: ram,
        isChecked: false
      };
    });
  }

  //This function is used to apply filter values and get result of filtered server list
  searchServers() {

    //init applied filter obj
    let appliedFilters = {
      ram: [],
      location: this.selectedLocation,
      hddType: this.selectedHddType
    };

    //Set applied ram filters value 
    appliedFilters.ram = this.ramFiltersList.filter((ram) => ram.isChecked).map(a => a.name)

    //Filter the server list only when any filter is applied
    if (this.selectedLocation || this.selectedHddType || appliedFilters.ram.length) {
      this.serverList = this.filterService.filterServerslist(appliedFilters);
      this.isFilterApplied = true;
    } else
      alert("Please select any filter");
  }

  //This function is used to discard all filters
  discardFilters(){
    this.selectedHddType = undefined;
    this.selectedLocation = undefined;
    this.initRamFilterValues();
    this.isFilterApplied = false;
    this.serverList = this.filterService.getServerListAndFilterValues().serverList;
  }

}
