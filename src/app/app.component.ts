import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxUiLoaderConfig, SPINNER, PB_DIRECTION, NgxUiLoaderModule } from 'ngx-ui-loader';
import { RouteGuard } from './services/route-guard.guard';
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  text: "...Loading",
  textColor: '#FFFFFF',
  textPosition: 'center-center',
  pbColor: 'red',
  bgsColor: 'red',
  fgsColor: 'red',
  fgsType: SPINNER.ballSpinClockwise,
  fgsSize: 100,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxUiLoaderModule],
  providers: [
    { provide: 'NGX_UI_LOADER_CONFIG', useValue: ngxUiLoaderConfig }, RouteGuard],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Cafe_Management_System';
  constructor() {

  }
}
