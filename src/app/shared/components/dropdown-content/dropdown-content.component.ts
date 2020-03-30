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
export class DropdownContentComponent implements OnInit, AfterContentInit {
  constructor(
    private dropdownService: DropdownService,
    private selfRef: ElementRef,
    private renderer: Renderer2
  ) {}
  isVisible = false;
  listener = null;
  dropdownId = "-1";
  toggleRef: ElementRef = null;

  @ContentChildren("", { descendants: true })
  children: QueryList<any>;

  setDropdownId(id) {
    this.dropdownId = id;
  }

  setToggleRef(toggleRef: ElementRef) {
    console.log("The toggle ref is set");
    this.toggleRef = toggleRef;
  }

  ngOnInit(): void {}

  ngAfterContentInit() {
    const activeDropdown = this.dropdownService.dropdownStatus;
    activeDropdown.subscribe();
    activeDropdown.forEach(idList => {
      idList.forEach(id => {
        if (this.dropdownId === id) {
          this.isVisible = true;
          this.listener = this.renderer.listen(
            "window",
            "click",
            (e: Event) => {
              const isToggleClicked = (this
                .toggleRef as any).elementRef.nativeElement.contains(e.target);
              if (
                !this.selfRef.nativeElement.contains(e.target) &&
                !isToggleClicked
              ) {
                this.dropdownService.closeDropdown();
              }
            }
          );
          return;
        }
      });
      this.isVisible = false;
      if (this.listener) {
        this.listener();
      }
    });
  }
}
