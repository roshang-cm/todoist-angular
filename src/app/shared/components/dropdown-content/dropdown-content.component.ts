import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  OnDestroy,
  ContentChild,
  ContentChildren,
  QueryList,
  AfterContentInit
} from "@angular/core";
import { DropdownService } from "src/app/services/dropdown.service";

@Component({
  selector: "app-dropdown-content",
  templateUrl: "./dropdown-content.component.html",
  styleUrls: ["./dropdown-content.component.scss"]
})
export class DropdownContentComponent implements OnInit, OnDestroy {
  constructor(
    private dropdownService: DropdownService,
    private selfRef: ElementRef,
    private renderer: Renderer2
  ) {
    const activeDropdown = this.dropdownService.dropdownStatus;
    activeDropdown.subscribe(id => {
      if (id === this.dropdownId) {
        this.isVisible = true;
      } else {
        this.isVisible = false;
      }
    });
  }
  isVisible = false;
  listener = null;
  dropdownId = "-1";
  toggleRef: ElementRef = null;

  @ContentChildren("", { descendants: true })
  children: QueryList<any>;

  setDropdownId(id) {
    this.dropdownId = id;
  }
  setVisible(isVisible: boolean) {
    if (isVisible) {
      this.enableVisible();
    } else {
      this.disableVisible();
    }
  }

  setToggleRef(toggleRef: ElementRef) {
    console.log("The toggle ref is set");
    this.toggleRef = toggleRef;
  }

  enableVisible() {
    this.dropdownService.openDropdown(this.dropdownId);
    this.listener = this.renderer.listen("window", "click", (e: Event) => {
      console.log("Still running");
      console.log("The id is", this.dropdownId);
      const isToggleClicked = (this
        .toggleRef as any).elementRef.nativeElement.contains(e.target);
      console.log("Is toggle clicked ", isToggleClicked);
      if (!this.selfRef.nativeElement.contains(e.target) && !isToggleClicked) {
        this.disableVisible();
      }
    });
  }

  disableVisible() {
    this.dropdownService.closeDropdown();
    if (this.listener) {
      this.listener();
    }
  }

  ngOnDestroy() {
    if (this.listener) {
      this.listener();
    }
  }

  ngOnInit(): void {}
}
