import { environment } from "src/environments/environment";

export function buildCompleteUrl(endpoint: string) {
  return `${environment.baseUrl}${endpoint}`;
}
