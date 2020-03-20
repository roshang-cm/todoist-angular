import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-collapsible-side-nav-item",
  templateUrl: "./collapsible-side-nav-item.component.html",
  styleUrls: ["./collapsible-side-nav-item.component.scss"]
})
export class CollapsibleSideNavItemComponent implements OnInit {
  @Input() expanded = false;

  toggleExpanded() {
    this.expanded = !this.expanded;
  }
  constructor() {}

  ngOnInit(): void {}
}
