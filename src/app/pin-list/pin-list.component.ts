import { Component } from '@angular/core';
import { PinListService } from './pin-list.service';
import * as $ from 'jquery';
import { AddCustomerService } from '../add-customer/add-customer.service';
import { AddPinService } from '../add-pin/add-pin.service';


@Component({
  selector: 'app-pin-list',
  templateUrl: './pin-list.component.html',
  styleUrls: ['./pin-list.component.css']
})
export class PinListComponent {

  pinList : any = [];

  constructor(private pinListService: PinListService, private addCustomerService : AddCustomerService, private addPinService : AddPinService) {}

  ngOnInit(){
    this.addPinService.syncPinData$.subscribe(result => {
      if (result) {
        this.pinList = result;
      }
    });
    this.getPinList();
  }

  getPinList(){
    this.pinList = this.pinListService.getPinData();
  }

  openAddCustomerOverlay() {
    this.addCustomerService.resetAddCustomerOverlay();
    this.pinListService.openCustomerOverlay();
  }

  openAddPinOverlay(){
    this.addPinService.resetAddPinOverlay(); 
    this.pinListService.openPinOverlay();
  }


  

}
