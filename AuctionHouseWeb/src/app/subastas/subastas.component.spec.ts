import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubastasComponent } from './subastas.component';

describe('SubastasComponent', () => {
  let component: SubastasComponent;
  let fixture: ComponentFixture<SubastasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubastasComponent]
    });
    fixture = TestBed.createComponent(SubastasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
