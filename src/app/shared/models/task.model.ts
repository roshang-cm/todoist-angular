export class Task {
  id: number;
  title: string;
  project: number;
  label: number;
  dueDate: Date;
  priority: number;
  section: number;
  parent: number;
  checked: boolean;
  order: number;

  constructor(
    id: number = null,
    title: string = "",
    project: number = null,
    label: number = null,
    dueDate: Date = null,
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
      object.dueDate,
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
