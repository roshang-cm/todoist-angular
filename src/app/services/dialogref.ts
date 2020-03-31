import { Task } from "../models/task.model";
import { OverlayRef } from "@angular/cdk/overlay";
import { Type } from "@angular/core";
import { Subject } from "rxjs";

export interface DialogContext {
  contextType: "task" | "project" | "filter" | string;
  contextData: Task | any | null;
  otherData: any;
}

export interface OverlayCloseEvent {
  type: "backdropClick" | "close";
  data: any;
}

export class DialogOverlayRef {
  constructor(
    public overlay: OverlayRef,
    public content: Type<any> | any,
    public data: DialogContext
  ) {
    overlay.backdropClick().subscribe(() => this._close("backdropClick", null));
  }

  afterClosed$ = new Subject<OverlayCloseEvent>();

  private _close(type: "backdropClick" | "close", data: any) {
    this.overlay.dispose();
    this.afterClosed$.next({
      type,
      data
    });

    this.afterClosed$.complete();
  }

  close(data?: any) {
    this._close("close", data);
  }
}
