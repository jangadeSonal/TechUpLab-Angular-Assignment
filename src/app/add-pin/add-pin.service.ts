import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddPinService {

  private syncPinData = new BehaviorSubject<any>([]);
  syncPinData$ = this.syncPinData.asObservable();
  
  private readonly localStorageKey = 'pinData';
  pinForm: FormGroup; 

  constructor(private http: HttpClient,private fb: FormBuilder) { 
    this.pinForm = this.fb.group({
      title: ['', Validators.required],
      image: ['', [Validators.required]],
      collaborators: [[], Validators.required],
      privacyOption: ['', Validators.required]
    });
  }

  getPinFormData() {
    return this.pinForm;
  }

  resetAddPinOverlay(){
    this.pinForm.reset();
    this.pinForm.patchValue({
      privacyOption:'Public'
    }); 
  }

  // Save pin data in localStorage
  savePinData(pinData: any[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(pinData));
    this.syncPinData.next(pinData);
  }

  // Get pin data from localStorage
  getPinData(): any[] {
    const storedData = localStorage.getItem(this.localStorageKey);
    return storedData ? JSON.parse(storedData) : [];
  }
  
}
