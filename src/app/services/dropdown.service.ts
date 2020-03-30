import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { v4 as uuid4 } from "uuid";

@Injectable({
  providedIn: "root"
})
export class DropdownService {
  activeDropdown$ = new Subject<string[]>();
  private activeDropdowns: string[] = [];

  emitValue(dropdowns: string[]) {
    console.log("Changed dropdown", dropdowns);
    this.activeDropdowns = dropdowns;
    this.activeDropdown$.next(this.activeDropdowns);
  }
  constructor() {
    this.emitValue([]);
  }

  closeDropdown() {
    this.emitValue([]);
  }

  openDropdown(id?: string) {
    if (!id) {
      id = uuid4();
    }
    console.log("The dropdown is now", id);
    const dropdowns = this.activeDropdowns;
    dropdowns.push(id);
    this.emitValue(dropdowns);
    return id;
  }

  get dropdownStatus() {
    return this.activeDropdown$.asObservable();
  }
}
