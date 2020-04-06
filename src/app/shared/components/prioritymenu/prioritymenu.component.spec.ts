import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioritymenuComponent } from './prioritymenu.component';

describe('PrioritymenuComponent', () => {
  let component: PrioritymenuComponent;
  let fixture: ComponentFixture<PrioritymenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrioritymenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrioritymenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
