import { Injectable } from "@angular/core";
import * as moment from "moment";
import { Task } from "../models/task.model";

@Injectable({
  providedIn: "root"
})
export class DateService {
  constructor() {}
  human(date: moment.Moment | Date | Task): string {
    let isTimeNeeded = false;
    if (date instanceof Task) {
      isTimeNeeded = date.withTime;
      date = date.dueDate;
    }
    const momentDate: moment.Moment = moment(date);
    const today = moment().startOf("day");
    if (momentDate.isSame(today, "day")) {
      if (isTimeNeeded) {
        return momentDate.fromNow();
      }
      return "Today";
    }
    if (momentDate.isSame(today.clone().subtract(1, "days"), "day")) {
      return "Yesterday";
    }
    if (momentDate.isSame(today.clone().add(1, "days"), "day")) {
      return "Tomorrow";
    }
    if (
      momentDate.isBetween(
        today.clone().subtract(8, "days"),
        today.clone().add(8, "days")
      )
    ) {
      return momentDate.fromNow();
    }
    return momentDate.format("DD MMM YYYY");
  }

  public get today() {
    return moment().startOf("day");
  }

  public get tomorrow() {
    return moment()
      .startOf("day")
      .add(1, "day");
  }

  public get nextWeek() {
    return moment()
      .startOf("day")
      .add(1, "week");
  }
}
