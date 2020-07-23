import { Injectable } from '@angular/core';

@Injectable()
export class UtilityService {

  constructor() { }

  toCamel(s: string): any {
    return s.replace(/([-_][a-z])/ig, ($1) => {
      return $1.toUpperCase()
        .replace('-', '')
        .replace('_', '');
    });
  }

  keysToCamel(o: any): any {
    if (o === Object(o) && !Array.isArray(o) && typeof o !== 'function') {
      const n = {};
      Object.keys(o)
        .forEach((k) => {
          n[this.toCamel(k)] = this.keysToCamel(o[k]);
        });
      return n;
    } else if (Array.isArray(o)) {
      return o.map((i) => {
        return this.keysToCamel(i);
      });
    }
    return o;
  }

  filterParams(filter: object): object {
    Object.keys(filter).forEach(element => {
      if (filter[element] === '' || filter[element] === [] || filter[element] === null || filter[element] === undefined) {
        delete filter[element];
      }
    });
    return { ...filter };
  }
}
