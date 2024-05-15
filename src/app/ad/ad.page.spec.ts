import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdPage } from './ad.page';

describe('AdPage', () => {
  let component: AdPage;
  let fixture: ComponentFixture<AdPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
