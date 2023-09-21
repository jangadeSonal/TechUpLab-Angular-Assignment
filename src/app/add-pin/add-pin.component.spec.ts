import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPinComponent } from './add-pin.component';

describe('AddPinComponent', () => {
  let component: AddPinComponent;
  let fixture: ComponentFixture<AddPinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPinComponent]
    });
    fixture = TestBed.createComponent(AddPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
