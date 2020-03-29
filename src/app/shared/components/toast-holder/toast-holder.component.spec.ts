import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastHolderComponent } from './toast-holder.component';

describe('ToastHolderComponent', () => {
  let component: ToastHolderComponent;
  let fixture: ComponentFixture<ToastHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToastHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
