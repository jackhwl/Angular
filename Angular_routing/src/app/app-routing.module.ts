import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './user/auth.guard';
import { SelectiveStrategy } from './selective-strategy.service';

@NgModule({
    imports:[
        RouterModule.forRoot([
            { path: 'welcome', component: WelcomeComponent },
            { 
                path: 'products', 
                canActivate: [AuthGuard],
                data: { preload: true },
                loadChildren: './products/product.module#ProductModule'
            },
            { path: '', redirectTo: 'welcome', pathMatch: 'full' },
            { path: '**', component: PageNotFoundComponent }
          ], { preloadingStrategy: SelectiveStrategy }) //, { enableTracing: true }
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }