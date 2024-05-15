import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MethodPaymentsPage } from './method-payments.page';

describe('MethodPaymentsPage', () => {
  let component: MethodPaymentsPage;
  let fixture: ComponentFixture<MethodPaymentsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MethodPaymentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
