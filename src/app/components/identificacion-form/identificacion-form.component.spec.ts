import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificacionFormComponent } from './identificacion-form.component';

describe('IdentificacionFormComponent', () => {
  let component: IdentificacionFormComponent;
  let fixture: ComponentFixture<IdentificacionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentificacionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificacionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
