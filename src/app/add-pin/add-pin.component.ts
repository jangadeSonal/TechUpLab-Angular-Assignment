import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AddPinService } from './add-pin.service';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { AddCustomerService } from '../add-customer/add-customer.service';

@Component({
  selector: 'app-add-pin',
  templateUrl: './add-pin.component.html',
  styleUrls: ['./add-pin.component.css']
})
export class AddPinComponent {

  pinForm: FormGroup; 
  collaboratorList: any = [];
  pinList : any = [];
  selectedFileName:any;
  
  constructor(private addPinService: AddPinService,private addCustomerService : AddCustomerService) { 
    this.pinForm = this.addPinService.getPinFormData();
  }

  ngOnInit(){
    this.addCustomerService.syncCustomerData$.subscribe(result => {
      if (result) {
        this.collaboratorList = result;
      }
    });
    this.getCustomerList();
    this.getPinList();

  }

  getCustomerList(){
    this.collaboratorList = this.addCustomerService.getCustomerData();  
  }

  getPinList(){
    this.pinList = this.addPinService.getPinData();
  }

  savePin() {

    for (const controlName in this.pinForm.controls) {
      if (this.pinForm.controls.hasOwnProperty(controlName)) {
        this.pinForm.controls[controlName].markAsTouched();
      }
    }

    // Check if the form is valid before saving
    if (this.pinForm.valid) {
      this.pinList.push(this.pinForm.value);
      this.addPinService.savePinData(this.pinList);

      // Close the overlay
      ($('#pinOverlay') as any).modal('hide');
    }
  }

 

  public uploaderOptions: FileUploaderOptions = {
    url: 'https://placeholder-url.com', // You can use a dummy URL
    itemAlias: 'file'
  };

  public uploader: FileUploader = new FileUploader(this.uploaderOptions);

  public onFileSelected(event: any): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file: File = fileInput.files[0];
      this.storeFileInLocalStorage(file);
    }
  }

  public onDrop(event: any): void {
    event.preventDefault();
    const file: File = event.dataTransfer.files[0];
    this.storeFileInLocalStorage(file);
  }

  onDragOver(event: any): void {}

  private storeFileInLocalStorage(file: File): void {
    this.selectedFileName = file.name;
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const fileData = e.target.result;

      this.pinForm.patchValue({
        image:fileData
      }); 

    };
    reader.readAsDataURL(file);
  }

}
