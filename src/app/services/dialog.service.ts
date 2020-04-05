import { Injectable, Type, Injector } from "@angular/core";
import {
  Overlay,
  OverlayRef,
  OverlayConfig,
  PositionStrategy,
  ConnectionPositionPair
} from "@angular/cdk/overlay";
import { ComponentPortal, PortalInjector } from "@angular/cdk/portal";
import { Task } from "../models/task.model";
import { Subject } from "rxjs";
import { DialogComponent } from "../shared/components/dialog/dialog.component";
import { DialogContext, DialogOverlayRef } from "./dialogref";

@Injectable({
  providedIn: "root"
})
export class DialogService {
  private getOverlayPosition(
    origin: HTMLElement | EventTarget | any
  ): PositionStrategy {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(origin)
      .withPositions(this.getPositions())
      .withPush(false);

    return positionStrategy;
  }

  private getPositions(): ConnectionPositionPair[] {
    return [
      {
        originX: "center",
        originY: "top",
        overlayX: "center",
        overlayY: "bottom"
      },
      {
        originX: "center",
        originY: "bottom",
        overlayX: "center",
        overlayY: "top"
      }
    ];
  }

  constructor(private overlay: Overlay, private injector: Injector) {}

  openDialog(
    content: Type<any> | any,
    data: DialogContext | any,
    overlayConfig: OverlayConfig = {}
  ): DialogOverlayRef {
    const defaultConfig = {
      hasBackdrop: true,
      panelClass: ["modal", "is-active"],
      backdropClass: "modal-background",

      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically()
    };
    const configs = new OverlayConfig({
      ...defaultConfig,
      ...overlayConfig
    });

    const overlayRef = this.overlay.create(configs);
    const dialogOVerlayRef = new DialogOverlayRef(overlayRef, content, data);
    const injector = this.createInjector(dialogOVerlayRef, this.injector);
    overlayRef.attach(new ComponentPortal(DialogComponent, null, injector));
    return dialogOVerlayRef;
  }

  openPopover(
    origin: HTMLElement | EventTarget,
    content: Type<any> | any,
    data: DialogContext | any,
    width: any = "",
    height: any = ""
  ): DialogOverlayRef {
    console.log("RECEIVED");
    console.log(origin, content, data);
    const defaultConfig = {
      width,
      height,
      hasBackdrop: true,
      panelClass: ["popover", "is-active"],
      backdropClass: "popover-background",
      positionStrategy: this.getOverlayPosition(origin),
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    };
    const configs = new OverlayConfig(defaultConfig);

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
