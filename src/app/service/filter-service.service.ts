import { Injectable } from '@angular/core';

import serverData from '../../assets/serverData.json';
@Injectable({
  providedIn: 'root'
})
export class FilterService {
  constructor() { }

  getServerListAndFilterValues() {
    return serverData;
  }

  //This function is used to filter the server list based on applied filters
  filterServerslist(appliedFilters) {
    
    let result = serverData.serverList; // get all server list

    //apply ram filters
    if (appliedFilters.ram.length) {
      result = result.filter((server) => {
        let isFound = false;

        //check each applied filter, based on that set isFound flag
        appliedFilters.ram.map((filterValue) => {
          if (server.RAM.substring(0, server.RAM.indexOf('GB'))) {
            isFound = true;
          }
        });
        return isFound;
      });
    }

    //Filter by HDD Type
    if (appliedFilters.hddType) {
      result = result.filter((server) => {
        return server.HDD.includes(appliedFilters.hddType);
      });
    }

    //Filter by location
    if (appliedFilters.location) {
      result = result.filter((server) => {
        return server.Location == appliedFilters.location;
      });
    }
    return result;
  }
}
