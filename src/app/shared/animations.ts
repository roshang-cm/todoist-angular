import {
  AnimationTriggerMetadata,
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";

export const enterLeaveAnimation: AnimationTriggerMetadata = trigger(
  "enterLeave",
  [
    state(
      "void",
      style({
        opacity: 0,
        transform: "scale(0.9)"
      })
    ),
    transition(":enter, :leave", animate("0.19s 0s ease"))
  ]
);
