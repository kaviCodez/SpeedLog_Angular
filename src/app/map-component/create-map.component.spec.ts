import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMapComponent } from './create-map.component';

describe('CreatePatrolComponent', () => {
  let component: CreateMapComponent;
  let fixture: ComponentFixture<CreateMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
