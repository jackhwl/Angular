import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TICKETMODULE_ROUTE_KEY } from "./reducers";
//import { AppComponent } from "./containers/app.component";

const routes: Routes = [
  {
    path: TICKETMODULE_ROUTE_KEY,
    loadChildren: () => import("./tickets.module").then(m => m.TicketsModule)
  },
  { path: "", redirectTo: TICKETMODULE_ROUTE_KEY, pathMatch: "full" }
  //  { path: "**", component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
