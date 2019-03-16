import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubpropertyComponent } from './subproperty.component';

describe('SubpropertyComponent', () => {
  let component: SubpropertyComponent;
  let fixture: ComponentFixture<SubpropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubpropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubpropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
