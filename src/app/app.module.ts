import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
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
import { ToastHolderComponent } from "./shared/components/toast-holder/toast-holder.component";
import { AuthInterceptorInterceptor } from "./interceptors/auth-interceptor.interceptor";
import { MenuItemComponent } from "./shared/components/menu-item/menu-item.component";
import { TaskContextualMenuComponent } from "./shared/components/task-contextual-menu/task-contextual-menu.component";
import { TaskContextualScheduleMenuComponent } from "./shared/components/task-contextual-schedule-menu/task-contextual-schedule-menu.component";
import { PrioritySelectorComponent } from "./shared/components/priority-selector/priority-selector.component";
import appRoutes from "./routes";
import { TasksViewComponent } from "./components/tasks-view/tasks-view.component";
import { NewProjectDialogComponent } from "./shared/components/new-project-dialog/new-project-dialog.component";
import { DialogComponent } from "./shared/components/dialog/dialog.component";
import { OverlayModule } from "@angular/cdk/overlay";
import { DialogPanelUiComponent } from "./shared/components/dialog-panel-ui/dialog-panel-ui.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { ProjectMenuComponent } from './shared/components/project-menu/project-menu.component';
import { PrioritymenuComponent } from './shared/components/prioritymenu/prioritymenu.component';
import { MenuItemComponentComponent } from './shared/components/menu-item-component/menu-item-component.component';
import { TimeMenuComponent } from './shared/components/time-menu/time-menu.component';
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
    ToastComponent,
    ToastHolderComponent,
    MenuItemComponent,
    TaskContextualMenuComponent,
    TaskContextualScheduleMenuComponent,
    PrioritySelectorComponent,
    TasksViewComponent,
    NewProjectDialogComponent,
    DialogComponent,
    DialogPanelUiComponent,
    ProjectMenuComponent,
    PrioritymenuComponent,
    MenuItemComponentComponent,
    TimeMenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DragDropModule,
    FormsModule,
    OverlayModule,
    MatDatepickerModule,
    MatMomentDateModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true
    }
  ],
  entryComponents: [DialogComponent, NewProjectDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
