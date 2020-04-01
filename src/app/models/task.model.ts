import * as moment from "moment";

export class Task {
  id: string;
  title: string;
  project: string;
  label: number;
  dueDate: moment.Moment;
  withTime: boolean;
  priority: number;
  section: number;
  parent: number;
  checked: boolean;
  order: number;

  constructor(
    id: string = null,
    title: string = "",
    project: string = null,
    label: number = null,
    dueDate: moment.Moment = null,
    withTime: boolean = false,
    priority: number = null,
    section: number = null,
    parent: number = null,
    checked: boolean = false,
    order: number = null
  ) {
    this.id = id;
    this.title = title;
    this.project = project;
    this.label = label;
    this.dueDate = dueDate;
    this.withTime = withTime;
    this.priority = priority;
    this.section = section;
    this.parent = parent;
    this.checked = checked;
    this.order = order;
  }

  static fromJson(object: Task | any) {
    return new Task(
      object.id,
      object.title,
      object.project,
      object.label,
      object.dueDate ? moment(object.dueDate) : null,
      object.withTime,
      object.priority,
      object.section,
      object.parent,
      object.checked,
      object.order
    );
  }

  toJson(): string {
    return JSON.stringify(this);
  }
}
