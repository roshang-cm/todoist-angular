import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { AuthServiceService } from "./auth-service.service";
import { buildCompleteUrl } from "../shared/utils";
import { SyncAction } from "./task.service";
import { Task } from "../models/task.model";
import { tap } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class TaskHttpService {
  constructor(
    private http: HttpClient,
    private authService: AuthServiceService
  ) {}

  buildJWTHeader() {
    return {
      authorization: `Bearer ${this.authService.auth.jwt}`
    };
  }

  getTasksFromBackend() {
    return this.http
      .get(buildCompleteUrl("tasks"), {
        ...this.buildJWTHeader
      })
      .subscribe(response => {
        console.log(response);
      });
  }

  _addTaskHttpCall(task: Task) {
    return this.http.post(buildCompleteUrl("tasks"), task).pipe(
      tap(
        response => {
          console.log("Backend: Added task ", response);
        },
        error => {
          console.log("Failed to add task", error);
        }
      )
    );
  }

  executeSyncAction(
    syncAction: SyncAction,
    onSuccess: (arg0: SyncAction) => any
  ) {
    switch (syncAction.action) {
      case "ADD_TASK":
        this._addTaskHttpCall(syncAction.task).subscribe(response => {
          console.log("SYNC:: Sync action complete");
          onSuccess(syncAction);
        });
        break;

      default:
        break;
    }
  }
}
