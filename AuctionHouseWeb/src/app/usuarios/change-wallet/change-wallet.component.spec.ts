import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeWalletComponent } from './change-wallet.component';

describe('ChangeWalletComponent', () => {
  let component: ChangeWalletComponent;
  let fixture: ComponentFixture<ChangeWalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeWalletComponent]
    });
    fixture = TestBed.createComponent(ChangeWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
