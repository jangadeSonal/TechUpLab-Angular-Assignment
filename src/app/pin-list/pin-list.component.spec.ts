import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinListComponent } from './pin-list.component';

describe('PinListComponent', () => {
  let component: PinListComponent;
  let fixture: ComponentFixture<PinListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PinListComponent]
    });
    fixture = TestBed.createComponent(PinListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
