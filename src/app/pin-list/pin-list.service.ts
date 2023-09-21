import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PinListService {

  private isCustemerOverlayVisible = new BehaviorSubject<boolean>(false);
  overlayCustomerVisibility$ = this.isCustemerOverlayVisible.asObservable();

  private isPinOverlayVisible = new BehaviorSubject<boolean>(false);
  overlayPinVisibility$ = this.isPinOverlayVisible.asObservable();

  private readonly localStorageKey = 'pinData';
  
  constructor() {}

  openCustomerOverlay() { 
    this.isCustemerOverlayVisible.next(true);
  }

  openPinOverlay() { 
    this.isPinOverlayVisible.next(true);
  }

   // Get pin data from localStorage
  getPinData(): any[] {
    const storedData = localStorage.getItem(this.localStorageKey);
    return storedData ? JSON.parse(storedData) : [];
  }
}
