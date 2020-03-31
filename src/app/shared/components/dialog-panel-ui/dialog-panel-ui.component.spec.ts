import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPanelUiComponent } from './dialog-panel-ui.component';

describe('DialogPanelUiComponent', () => {
  let component: DialogPanelUiComponent;
  let fixture: ComponentFixture<DialogPanelUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPanelUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPanelUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
