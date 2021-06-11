import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
//import { AppComponent } from "./containers/app.component";

const routes: Routes = [
  {
    path: "tickets",
    loadChildren: () => import("./tickets.module").then(m => m.TicketsModule)
  },
  { path: "", redirectTo: "tickets", pathMatch: "full" }
  //  { path: "**", component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
