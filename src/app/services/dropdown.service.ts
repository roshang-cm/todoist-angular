import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { v4 as uuid4 } from "uuid";

@Injectable({
  providedIn: "root"
})
export class DropdownService {
  activeDropdown$ = new Subject<string>();
  constructor() {
    this.activeDropdown$.next(null);
  }

  closeDropdown() {
    this.activeDropdown$.next(null);
  }

  openDropdown(id?: string) {
    if (!id) {
      id = uuid4();
    }
    console.log("The dropdown is now", id);
    this.activeDropdown$.next(id);
    return id;
  }

  get dropdownStatus() {
    return this.activeDropdown$.asObservable();
  }
}
