import { Component } from '@angular/core';
import { PinListService } from './pin-list/pin-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sonal_Jangade';

  constructor(private pinListService: PinListService) { }

  ngOnInit() {
    // Show add customer overlay
    this.pinListService.overlayCustomerVisibility$.subscribe(showModal => {
      if (showModal) {
        ($('#customerOverlay') as any).modal('show');
      }
    });

    // Show add pin overlay
    this.pinListService.overlayPinVisibility$.subscribe(showModal => {
      if (showModal) {
        ($('#pinOverlay') as any).modal('show');
      }
    });
  }
}
