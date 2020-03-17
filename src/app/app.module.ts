import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { PageTitleComponent } from './shared/components/page-title/page-title.component';
import { TaskListTileComponent } from './shared/components/task-list-tile/task-list-tile.component';
import { AddTaskListTileComponent } from './shared/components/add-task-list-tile/add-task-list-tile.component';
import { AddTaskPanelComponent } from './shared/components/add-task-panel/add-task-panel.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, HeaderComponent, FooterComponent, PageTitleComponent, TaskListTileComponent, AddTaskListTileComponent, AddTaskPanelComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
