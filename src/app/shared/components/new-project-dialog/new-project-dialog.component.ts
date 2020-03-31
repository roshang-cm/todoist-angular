import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-new-project-dialog",
  templateUrl: "./new-project-dialog.component.html",
  styleUrls: ["./new-project-dialog.component.scss"]
})
export class NewProjectDialogComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    alert("hell");
  }
}
