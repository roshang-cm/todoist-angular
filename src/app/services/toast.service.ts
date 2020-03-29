import { Injectable } from "@angular/core";
import { Task } from "../models/task.model";
import { ThrowStmt } from "@angular/compiler";
import { v4 as uuid4 } from "uuid";

export interface ToastAction {
  name: string;
  type: "default" | "primary";
  callback: (Toast) => any;
}

export function defaultUndoAction(callbackFn: (Toast) => any) {
  const toastAction: ToastAction = {
    type: "primary",
    name: "Undo",
    callback: callbackFn
  };
  return toastAction;
}

export interface Toast {
  id?: number | string;
  task?: Task | null;
  previousTask?: Task | null;
  message: string;
  actions?: ToastAction[] | null;
  duration?: number;
}

@Injectable({
  providedIn: "root"
})
export class ToastService {
  private _messages: Toast[] = [];
  constructor() {}

  get messages() {
    return this._messages;
  }

  show(toast: Toast) {
    toast.id = uuid4();
    if (!toast.duration) {
      toast.duration = 5000;
    }
    this._messages.push(toast);
    setTimeout(() => {
      this._messages = this._messages.filter(
        toastInList => toastInList.id !== toast.id
      );
    }, toast.duration);
  }
}
