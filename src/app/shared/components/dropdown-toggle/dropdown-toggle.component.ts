import {
  Component,
  OnInit,
  AfterContentInit,
  ContentChild,
  ElementRef
} from "@angular/core";
import { DropdownService } from "src/app/services/dropdown.service";

@Component({
  selector: "app-dropdown-toggle",
  templateUrl: "./dropdown-toggle.component.html",
  styleUrls: ["./dropdown-toggle.component.scss"]
})
export class DropdownToggleComponent implements OnInit {
  dropdownId: string;
  toggleState: boolean = false;
  constructor(
    private elementRef: ElementRef,
    private dropdownService: DropdownService
  ) {}

  refCallBack: (ref: ElementRef) => any = null;

  onClickedAction() {}
  setOnClickedAction(callback: () => void) {
    this.onClickedAction = callback;
  }

  setDropdownId(id) {
    this.dropdownId = id;
  }

  onToggleClicked() {
    if (this.toggleState) {
      this.dropdownService.closeDropdown();
    } else {
      this.dropdownService.openDropdown(this.dropdownId);
    }
    this.toggleState = !this.toggleState;
  }

  ngOnInit(): void {}

  setRefCallback(callback: (ref: ElementRef) => any) {
    this.refCallBack = callback;
  }
}
