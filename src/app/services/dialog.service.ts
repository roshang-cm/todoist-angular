import { Injectable, Type, Injector } from "@angular/core";
import { Overlay, OverlayRef, OverlayConfig } from "@angular/cdk/overlay";
import { ComponentPortal, PortalInjector } from "@angular/cdk/portal";
import { Task } from "../models/task.model";
import { Subject } from "rxjs";
import { DialogComponent } from "../shared/components/dialog/dialog.component";
import { DialogContext, DialogOverlayRef } from "./dialogref";

@Injectable({
  providedIn: "root"
})
export class DialogService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  open(content: Type<any> | any, data: DialogContext | any): DialogOverlayRef {
    alert("called");
    const configs = new OverlayConfig({
      hasBackdrop: true,
      panelClass: ["modal", "is-active"],
      backdropClass: "modal-background"
    });

    const overlayRef = this.overlay.create(configs);
    const dialogOVerlayRef = new DialogOverlayRef(overlayRef, content, data);
    const injector = this.createInjector(dialogOVerlayRef, this.injector);
    overlayRef.attach(new ComponentPortal(DialogComponent, null, injector));
    return dialogOVerlayRef;
  }

  createInjector(ref: DialogOverlayRef, inj: Injector) {
    const injectorTokens = new WeakMap([[DialogOverlayRef, ref]]);
    return new PortalInjector(inj, injectorTokens);
  }
}
