import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Input,
  ContentChild,
  AfterContentInit,
  ElementRef
} from "@angular/core";
import { DropdownToggleComponent } from "../dropdown-toggle/dropdown-toggle.component";
import { DropdownContentComponent } from "../dropdown-content/dropdown-content.component";
import { DropdownService } from "src/app/services/dropdown.service";
import { v4 as uuid4 } from "uuid";

@Component({
  selector: "app-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.scss"]
})
export class DropdownComponent implements OnInit, AfterContentInit {
  @ContentChild(DropdownToggleComponent)
  dropdownToggleComponent: DropdownToggleComponent;

  @ContentChild(DropdownToggleComponent)
  dropdownToggleComponentRef: ElementRef;

  @ContentChild(DropdownContentComponent)
  dropdownContentComponent: DropdownContentComponent;

  @Input() isVisible = false;
  constructor(private dropdownService: DropdownService) {}

  ngOnInit(): void {}

  ngAfterContentInit() {
    console.log(this.dropdownToggleComponentRef);
    const dropdownId = uuid4();
    this.dropdownContentComponent.setDropdownId(dropdownId);
    this.dropdownToggleComponent.setDropdownId(dropdownId);
    this.dropdownContentComponent.setToggleRef(this.dropdownToggleComponentRef);
  }
}