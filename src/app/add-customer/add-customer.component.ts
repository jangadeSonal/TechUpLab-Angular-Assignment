import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AddCustomerService } from './add-customer.service';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {

  regions: any = [];
  countries: any = [];
  customers: any = [];
  customerForm: FormGroup;

  constructor(private addCustomerService: AddCustomerService) {
    this.customerForm = this.addCustomerService.getCustomerFormData();
  }

  ngOnInit() {

    this.addCustomerService.countriesList$.subscribe((result: any) => {
      if (result) {
        this.countries = result;
      }
    });

    this.getRegionList();
    this.getCustomerList();
  }

  getCustomerList() {
    this.customers = this.addCustomerService.getCustomerData();
  }

  getRegionList() {
    this.addCustomerService.getRegionList()
      .subscribe({
        next: (data: any) => {
          const region = Object.values(data.data).map((country: any) => country.region);

          // Remove duplicate regions (optional)
          const uniqueRegions = [...new Set(region)];

          // Sort the regions alphabetically
          this.regions = uniqueRegions.sort();

        },
        error: (error: any) => {
          console.log("Error:", error);
        }
      });
  }

  onRegionChange(selectedRegion: any) {
    this.addCustomerService.getCountryByRegion(selectedRegion)
      .subscribe({
        next: (data: any) => {
          this.countries = Object.values(data.data);
        },
        error: (error: any) => {
          console.log("Error:", error);
        }
      });
  }

  saveCustomer() {

    for (const controlName in this.customerForm.controls) {
      if (this.customerForm.controls.hasOwnProperty(controlName)) {
        this.customerForm.controls[controlName].markAsTouched();
      }
    }

    // Check if the form is valid before saving
    if (this.customerForm.valid) {
      this.customers.push(this.customerForm.value);
      this.addCustomerService.saveCustomerData(this.customers);

      // Close the overlay
      ($('#customerOverlay') as any).modal('hide');
    }
  }

}
