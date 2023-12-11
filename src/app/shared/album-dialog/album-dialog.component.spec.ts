import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumDialogComponent } from './album-dialog.component';

describe('ElementDialogComponent', () => {
  let component: AlbumDialogComponent;
  let fixture: ComponentFixture<AlbumDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlbumDialogComponent]
    });
    fixture = TestBed.createComponent(AlbumDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
