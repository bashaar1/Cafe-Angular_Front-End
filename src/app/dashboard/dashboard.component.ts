import { Component } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constant';
import { MatCard } from '@angular/material/card';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCard, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  responseMessage: any;
  data: any;
  constructor(private dashboardService: DashboardService, private ngxService: NgxUiLoaderService,
    private snackbar: SnackbarService) {
    this.ngxService.start();
    this.dashboardData();
  }
  dashboardData() {
    this.dashboardService.getDetails().subscribe((response) => {
      this.ngxService.stop();
      this.data = response;

    }, (error: any) => {
      this.ngxService.stop();
      console.log(error)
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbar.openSnackBar(this.responseMessage, GlobalConstants.error);

    })
  }
}
