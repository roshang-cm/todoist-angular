import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { TasksViewComponent } from "./components/tasks-view/tasks-view.component";
import { HeaderComponent } from "./components/header/header.component";

const appRoutes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      { path: "inbox", component: TasksViewComponent, data: { type: "inbox" } },
      {
        path: "date/:type",
        component: TasksViewComponent,
        data: { type: "date" }
      },
      {
        path: "project/:id",
        component: TasksViewComponent,
        data: { type: "project" }
      },
      {
        path: "filter/:id",
        component: TasksViewComponent,
        data: { type: "filter" }
      },
      { path: "**", redirectTo: "inbox" }
    ]
  },
  { path: "**", component: HeaderComponent }
];

export default appRoutes;
