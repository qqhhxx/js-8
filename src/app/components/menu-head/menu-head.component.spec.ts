import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuHeadComponent } from './menu-head.component';

describe('MenuHeadComponent', () => {
  let component: MenuHeadComponent;
  let fixture: ComponentFixture<MenuHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuHeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
