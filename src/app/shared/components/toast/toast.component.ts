import { Component, OnInit, Input } from "@angular/core";
import { Toast } from "src/app/services/toast.service";
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
  constructor() {}

  ngOnInit(): void {}
}
