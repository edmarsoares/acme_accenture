import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroItemComponent } from './cadastro-item.component';

describe('CadastroItemComponent', () => {
  let component: CadastroItemComponent;
  let fixture: ComponentFixture<CadastroItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
