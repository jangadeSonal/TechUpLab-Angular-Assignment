import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddCustomerService {

  private syncCustomerData = new BehaviorSubject<any>([]);
  syncCustomerData$ = this.syncCustomerData.asObservable();

  private countriesList = new BehaviorSubject<any>([]);
  countriesList$ = this.countriesList.asObservable();

  private readonly localStorageKey = 'customerData';
  public customerForm: FormGroup;

  constructor(private http: HttpClient, public fb: FormBuilder) {
    // Initialize the customerForm FormGroup with validation rules
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      region: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  getCustomerFormData() {
    return this.customerForm;
  }

  resetAddCustomerOverlay(){
    this.customerForm.reset();
    this.countriesList.next([]);
  }

  getRegionList(): Observable<any> {
    return this.http.get<any>('https://api.first.org/data/v1/countries');
  }

  getCountryByRegion(selectedRegion: any): Observable<any> {
    return this.http.get<any>(`https://api.first.org/data/v1/countries?region=${selectedRegion}`)
  }

  // Save customer data in localStorage
  saveCustomerData(customerData: any[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(customerData));
    this.syncCustomerData.next(customerData);
  }

  // Get customer data from localStorage
  getCustomerData(): any[] {
    const storedData = localStorage.getItem(this.localStorageKey);
    return storedData ? JSON.parse(storedData) : [];
  }


}
