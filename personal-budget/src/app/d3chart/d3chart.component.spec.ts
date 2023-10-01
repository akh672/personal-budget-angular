import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3chartComponent } from './d3chart.component';

describe('D3chartComponent', () => {
  let component: D3chartComponent;
  let fixture: ComponentFixture<D3chartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [D3chartComponent]
    });
    fixture = TestBed.createComponent(D3chartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
