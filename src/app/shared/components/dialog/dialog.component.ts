import { Component, OnInit } from "@angular/core";
import { DialogOverlayRef } from "src/app/services/dialogref";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"]
})
export class DialogComponent implements OnInit {
  constructor(private ref: DialogOverlayRef) {}
  content: any;
  ngOnInit(): void {
    this.content = this.ref.content;
  }
}
