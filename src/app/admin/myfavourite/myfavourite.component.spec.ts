import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfavouriteComponent } from './myfavourite.component';

describe('MyfavouriteComponent', () => {
  let component: MyfavouriteComponent;
  let fixture: ComponentFixture<MyfavouriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyfavouriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyfavouriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
