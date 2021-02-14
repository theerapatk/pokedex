import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestComponent } from './test.component';

describe('TestComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const testCases = [
    { inputs: [4, 1, 2], results: [3] },
    { inputs: undefined, results: [] },
    { inputs: [], results: [] },
    { inputs: [1, 2, 3], results: [] },
    { inputs: [8, 1, 5, 3], results: [2, 4, 6, 7] },
    { inputs: [2], results: [1] },
    { inputs: [1], results: [] }
  ];
  testCases.forEach(testCase => {
    it(`should findMissingNumber given the input is ${testCase.inputs}`, () => {
      const results = component.findMissingNumber(testCase.inputs);
      expect(results).toEqual(testCase.results);
    });
  });
});
