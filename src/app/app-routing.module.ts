import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { PricingComponent } from './pricing/pricing.component';
import { DescriptionComponent } from './description/description.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { PublishNewComponent } from './publish-new/publish-new.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: LandingPageComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'what-we-do', component: DescriptionComponent },
  { path: 'userprofile', component: UserDashboardComponent, canActivate: [AuthGuard], },
  { path: 'userprofile/publish', component: PublishNewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
