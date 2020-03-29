import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  OnDestroy
} from "@angular/core";

@Component({
  selector: "app-dropdown-content",
  templateUrl: "./dropdown-content.component.html",
  styleUrls: ["./dropdown-content.component.scss"]
})
export class DropdownContentComponent implements OnInit, OnDestroy {
  isVisible = false;
  listener = null;
  toggleRef: ElementRef = null;
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
    this.isVisible = true;
    this.listener = this.renderer.listen("window", "click", (e: Event) => {
      console.log("Still running");
      console.log("The toggle ref is ", this.toggleRef);
      const isToggleClicked = this.toggleRef.elementRef.nativeElement.contains(
        e.target
      );
      console.log("Is toggle clicked ", isToggleClicked);
      if (!this.selfRef.nativeElement.contains(e.target) && !isToggleClicked) {
        this.disableVisible();
      }
    });
  }

  disableVisible() {
    this.isVisible = false;
    if (this.listener) {
      this.listener();
    }
  }

  ngOnDestroy() {
    this.listener();
  }

  constructor(private selfRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {}
}
