import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoRoundedModalPage } from './photo-rounded-modal.page';

describe('PhotoRoundedModalPage', () => {
  let component: PhotoRoundedModalPage;
  let fixture: ComponentFixture<PhotoRoundedModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PhotoRoundedModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
