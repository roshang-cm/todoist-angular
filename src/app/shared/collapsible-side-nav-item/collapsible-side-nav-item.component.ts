import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-collapsible-side-nav-item",
  templateUrl: "./collapsible-side-nav-item.component.html",
  styleUrls: ["./collapsible-side-nav-item.component.scss"]
})
export class CollapsibleSideNavItemComponent implements OnInit {
  @Input() expanded = false;
  @Input() title = "";
  @Input() action: {
    tooltipText: string;
    icon: string;
    callback: () => any;
  } = null;
  toggleExpanded() {
    this.expanded = !this.expanded;
  }
  constructor() {}

  ngOnInit(): void {}
}
