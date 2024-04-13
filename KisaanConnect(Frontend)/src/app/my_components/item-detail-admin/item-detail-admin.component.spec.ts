import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailAdminComponent } from './item-detail-admin.component';

describe('ItemDetailAdminComponent', () => {
  let component: ItemDetailAdminComponent;
  let fixture: ComponentFixture<ItemDetailAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDetailAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
