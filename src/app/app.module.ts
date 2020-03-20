import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { PageTitleComponent } from "./shared/components/page-title/page-title.component";
import { TaskListTileComponent } from "./shared/components/task-list-tile/task-list-tile.component";
import { AddTaskListTileComponent } from "./shared/components/add-task-list-tile/add-task-list-tile.component";
import { AddTaskPanelComponent } from "./shared/components/add-task-panel/add-task-panel.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { FormsModule } from "@angular/forms";
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { SideNavItemComponent } from "./shared/side-nav-item/side-nav-item.component";
import { CollapsibleSideNavItemComponent } from "./shared/collapsible-side-nav-item/collapsible-side-nav-item.component";
import { IconButtonComponent } from "./shared/icon-button/icon-button.component";
import { ToastComponent } from "./shared/components/toast/toast.component";
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PageTitleComponent,
    TaskListTileComponent,
    AddTaskListTileComponent,
    AddTaskPanelComponent,
    SidenavComponent,
    SideNavItemComponent,
    CollapsibleSideNavItemComponent,
    IconButtonComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
