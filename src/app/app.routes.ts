import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouteGuard } from './services/route-guard.guard';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { BillComponent } from './bill/bill.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'cafe',
        children: [
            {
                path: "dashboard",
                component: DashboardComponent,
                canActivate: [RouteGuard],
                data: { expectedRole: ['admin', 'user'] }
            },
            {
                path: 'category',
                component: CategoryComponent,
                canActivate: [RouteGuard],
                data: { expectedRole: ['admin'] }
            },
            {
                path: 'product',
                component: ProductComponent,
                canActivate: [RouteGuard],
                data: { expectedRole: ['admin'] }
            },
            {
                path: 'bill',
                component: BillComponent,
                canActivate: [RouteGuard],
                data: { expectedRole: ['admin'] }
            }
        ]
    }
];
