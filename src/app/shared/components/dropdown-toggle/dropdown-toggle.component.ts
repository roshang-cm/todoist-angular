import {
  Component,
  OnInit,
  AfterContentInit,
  ContentChild,
  ElementRef
} from "@angular/core";

@Component({
  selector: "app-dropdown-toggle",
  templateUrl: "./dropdown-toggle.component.html",
  styleUrls: ["./dropdown-toggle.component.scss"]
})
export class DropdownToggleComponent implements OnInit {
  constructor(private elementRef: ElementRef) {}

  refCallBack: (ref: ElementRef) => any = null;

  onClickedAction() {}
  setOnClickedAction(callback: () => void) {
    this.onClickedAction = callback;
  }

  onToggleClicked() {
    this.onClickedAction();
  }

  ngOnInit(): void {}

  setRefCallback(callback: (ref: ElementRef) => any) {
    this.refCallBack = callback;
  }
}
