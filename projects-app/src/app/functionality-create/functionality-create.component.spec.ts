import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalityCreateComponent } from './functionality-create.component';

describe('FunctionalityCreateComponent', () => {
  let component: FunctionalityCreateComponent;
  let fixture: ComponentFixture<FunctionalityCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FunctionalityCreateComponent]
    });
    fixture = TestBed.createComponent(FunctionalityCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
