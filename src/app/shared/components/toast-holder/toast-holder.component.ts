import { Component, OnInit } from "@angular/core";
import { ToastService } from "src/app/services/toast.service";
import { enterLeaveAnimation } from "../../animations";

@Component({
  selector: "app-toast-holder",
  templateUrl: "./toast-holder.component.html",
  styleUrls: ["./toast-holder.component.scss"],
  animations: [enterLeaveAnimation]
})
export class ToastHolderComponent implements OnInit {
  constructor(private toastService: ToastService) {}

  getToasts() {
    return this.toastService.messages;
  }

  ngOnInit(): void {}
}
