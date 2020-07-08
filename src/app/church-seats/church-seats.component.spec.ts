import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChurchSeatsComponent } from './church-seats.component';

describe('ChurchSeatsComponent', () => {
  let component: ChurchSeatsComponent;
  let fixture: ComponentFixture<ChurchSeatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChurchSeatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChurchSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
