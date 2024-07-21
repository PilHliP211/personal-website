import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicTacBackComponent } from './tic-tac-back.component';

describe('TicTacBackComponent', () => {
  let component: TicTacBackComponent;
  let fixture: ComponentFixture<TicTacBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicTacBackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicTacBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
