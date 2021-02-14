import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularWelcomeComponent } from './angular-welcome.component';


describe('AngularWelcomeComponent', () => {
  let component: AngularWelcomeComponent;
  let fixture: ComponentFixture<AngularWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AngularWelcomeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'my-app'`, () => {
    const componentFixture = TestBed.createComponent(AngularWelcomeComponent);
    const app = componentFixture.componentInstance;
    expect(app.title).toEqual('my-app');
  });

  it('should render title', () => {
    const componentFixture = TestBed.createComponent(AngularWelcomeComponent);
    componentFixture.detectChanges();
    const compiled = componentFixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('my-app app is running!');
  });
});
