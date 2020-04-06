import { Component, OnInit } from "@angular/core";
import { DialogOverlayRef } from "src/app/services/dialogref";

@Component({
  selector: "app-delete-confirmation-dialog",
  templateUrl: "./delete-confirmation-dialog.component.html",
  styleUrls: ["./delete-confirmation-dialog.component.scss"],
})
export class DeleteConfirmationDialogComponent implements OnInit {
  constructor(private dialogRef: DialogOverlayRef) {}

  ngOnInit(): void {}

  onCloseClicked() {
    this.dialogRef.close(false);
  }

  onDeleteClicked() {
    this.dialogRef.close(true);
  }
}
