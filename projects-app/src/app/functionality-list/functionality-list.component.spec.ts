import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalityListComponent } from './functionality-list.component';

describe('FunctionalityListComponent', () => {
  let component: FunctionalityListComponent;
  let fixture: ComponentFixture<FunctionalityListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FunctionalityListComponent]
    });
    fixture = TestBed.createComponent(FunctionalityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
