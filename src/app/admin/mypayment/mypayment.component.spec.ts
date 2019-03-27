import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypaymentComponent } from './mypayment.component';

describe('MypaymentComponent', () => {
  let component: MypaymentComponent;
  let fixture: ComponentFixture<MypaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
