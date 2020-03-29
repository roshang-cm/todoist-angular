import { Component, OnInit, Input } from "@angular/core";
import {
  Toast,
  ToastAction,
  ToastService
} from "src/app/services/toast.service";
import {
  trigger,
  transition,
  style,
  animate,
  state
} from "@angular/animations";

@Component({
  selector: "app-toast",
  templateUrl: "./toast.component.html",
  styleUrls: ["./toast.component.scss"]
})
export class ToastComponent implements OnInit {
  @Input() toast: Toast;
  constructor(private toastService: ToastService) {}
  actionClicked(action: ToastAction) {
    action.callback(this.toast);
    this.toastService.dismissToast(this.toast.id);
  }
  ngOnInit(): void {}
}
