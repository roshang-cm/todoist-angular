import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-menu-item",
  templateUrl: "./menu-item.component.html",
  styleUrls: ["./menu-item.component.scss"],
})
export class MenuItemComponent implements OnInit {
  @Input() icon = null;
  @Input() selected = false;
  @Input() iconColor: string = "#c2c2c2";
  constructor() {}

  ngOnInit(): void {}
}
